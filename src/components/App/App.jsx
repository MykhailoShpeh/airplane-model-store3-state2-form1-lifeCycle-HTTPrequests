import css from './App.module.css';
import React, { Component } from "react";
import '@/App.css';
import { Section } from '@/components/Section/Section.jsx';
import planes from '@/json/planes.json';
import helicopters from '@/json/helicopters.json';
import aircrafts from '@/json/aircrafts.json';
import { PlanesList } from '@/components/PlanesList/PlanesList.jsx';
import { ScaleSelection } from '@/components/ScaleSelection/ScaleSelection.jsx';
import { Filter } from '@/components/Filter/Filter.jsx';
import { Sorter } from '@/components/Sorter/Sorter.jsx';
import { ModalRegistrationIdentification } from '@/components/ModalRegistrationIdentification/ModalRegistrationIdentification.jsx';
import { FormRegistration } from '@/components/FormRegistration/FormRegistration.jsx'
import { FormIdentification } from '@/components/FormIdentification/FormIdentification.jsx'
import { FormChoiceRegistrationOrIdentification } from '@/components/FormChoiceRegistrationOrIdentification/FormChoiceRegistrationOrIdentification.jsx'
import { RegistrationIdentification } from '@/components/RegistrationIdentification/RegistrationIdentification.jsx';
import debounce from "lodash.debounce";
import { number } from 'prop-types';
// import { updateSelectedModels } from '@/utils/';
//! Приклад початкового сортування на ім'я (за полем name.brief)
aircrafts.sort((firstModel, secondModel) => firstModel.name.brief.localeCompare(secondModel.name.brief));
//! Приклад початкового сортування за роком створення (за полем info.year)
// aircrafts.sort((firstModel, secondModel) => firstModel.info.year - secondModel.info.year);
//! Сортування, в якому моделі, яких немає в наявності знаходяться в кінці списку
console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++");
const arrayYes = aircrafts.filter(item => item.model.actualImages);

const arrayNo = aircrafts.filter(item => !item.model.actualImages);

console.log("arrayYes: ", arrayYes);
console.log("arrayNo: ", arrayNo);

// aircrafts.splice(0, aircrafts.length);
aircrafts.length = 0;

aircrafts.push(...arrayYes, ...arrayNo)

console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++");

// export function App() {
export class App extends Component {

  //!Фільтрація var.1
  state = {
    // isPlanes: false,
    // isHelicopters: false,
    // isAll: false,
    bgColor: "black",
    aircraftTitle: "Магазин моделей літальних апаратів",
    aircraftArray: aircrafts,
    buttonBackground: "",
    //! Візуалізація активної кнопки 
    activeButton: "allButton",
    // activeButtonIndex: null,
    indicesSelectedModels: JSON.parse(localStorage.getItem("selectedModelsId")) || [], //! масив індексів обраних моделей
    selectedModels: (JSON.parse(localStorage.getItem("selectedModelsId")) || []).flatMap((item) => aircrafts.filter((el) => item === el.id)), //! масив обраних моделей
    isCartButton: false, //! тригер: "якщо активна кнопка «Кошик»"
    // inputSearchValue: "", //! значення inputSearch
    aircraftsArrAfterFiltration: aircrafts,  //! дубльоване значення aircraftsArr після фільтрації
    selectedModelsArrAfterFiltration: (JSON.parse(localStorage.getItem("selectedModelsId")) || []).flatMap((item) => aircrafts.filter((el) => item === el.id)), //! дубльоване значення selectedModels після фільтрації
    searchInputValue: "", //! значення пошукового інпуту
    radioButtonValue: "brief", //! значення параметра для пошуку/фільтрації радіо-кнопки
    inputSearchPlaceholder: "Введіть назву ЛА", //! значення placeholder для inputSearch
    modelsSelectedScale: aircrafts, //! масив моделей обраного масштабу

    showModal: true,
    modalType: "",  //! 🧾 індикатор типу модального вікна
    users: JSON.parse(localStorage.getItem("users")) || [],
    activeUser: null, //! 🗣 активний (авторизований) користувач
    activeUserId: null, //! #️⃣🗣 індекс Активного (авторизованого) користувача
    modelScale: 'all'
  }

  //! 2.localStorage - Створення запису в localStorage під час першого запуску якщо його немає
  componentDidMount() {
    // const saved = localStorage.getItem("selectedModelsId");
    // if (!saved) {
    //   localStorage.setItem("selectedModelsId", JSON.stringify([]));
    // }

    // const savedUSers = localStorage.getItem("users");
    // if (!savedUSers) {
    //   localStorage.setItem("users", JSON.stringify([]));
    // }

    let users = JSON.parse(localStorage.getItem("users"))

    let activeUser = null;

    if (!users) {
      users = []
      localStorage.setItem("users", JSON.stringify([]));
    } else if (users.length > 0) {
      activeUser = users.find(user => user.isActive === true) === undefined
        ? null
        : JSON.parse(localStorage.getItem("users")).find(user => user.isActive === true);
    }

    //todo якщо users відсутні, то localstorage поверне null,
    //todo якщо є, (масив users не пустий), то localstorage поверне users
    //todo якщо є, (масив users пустий), то localstorage поверне пустий масив []

    console.log("activeUser: ", activeUser)

    const activeUserId = users.findIndex(user => user.isActive === true) === -1
      ? null
      : users.findIndex(user => user.isActive === true)

    console.log("activeUserId: ", activeUserId)

    this.setState({
      activeUser,
      activeUserId,
      showModal: activeUser ? false : true
    })

  };

  //! 3.localStorage - Оновлення(синхронізація) localStorage при кожній зміні indicesSelectedModels
  componentDidUpdate(prevProps, prevState) {
    //! Відслідковуємо зміну властивості indicesSelectedModels
    if (this.state.activeUser && (prevState.indicesSelectedModels !== this.state.indicesSelectedModels)) {
      localStorage.setItem(
        "selectedModelsId",
        JSON.stringify(this.state.indicesSelectedModels)
      );

      //todo змінити state та localstorage активного користувача, а саме властивість user.indicesSelectedModels
      const users = JSON.parse(localStorage.getItem("users"))

      users[this.state.activeUserId].indicesSelectedModels = this.state.indicesSelectedModels

      console.log("users - local: ", users)

      localStorage.setItem(
        "users",
        JSON.stringify(users)
      );

      this.setState({
        users,
        activeUser: users[this.state.activeUserId]
      })
    }
    //! Відслідковуємо зміну властивості users
    if (prevState.users !== this.state.users) {
      console.log("Властивість users змінилася")
      localStorage.setItem(
        "users",
        JSON.stringify(this.state.users)
      );

      //! перенесено в метод signOut
      this.setState({
        //   selectedModels: (JSON.parse(localStorage.getItem("selectedModelsId")) || []).flatMap((item) => aircrafts.filter((el) => item === el.id)),
        //   indicesSelectedModels: JSON.parse(localStorage.getItem("selectedModelsId")) || [], //! масив індексів обраних моделей
        selectedModelsArrAfterFiltration: (JSON.parse(localStorage.getItem("selectedModelsId")) || []).flatMap((item) => aircrafts.filter((el) => item === el.id)), //! дубльоване значення selectedModels після фільтрації
      })
    }
  };

  allFiltration = () => {
    console.log("All")

    this.setState({
      // isAll: true,
      // isPlanes: false,
      // isHelicopters: false,
      bgColor: 'green',
      aircraftTitle: "Магазин моделей літальних апаратів",
      aircraftArray: this.state.modelsSelectedScale,
      activeButton: "allButton",
      isCartButton: false, //! тригер: "якщо активна кнопка «Кошик»"
      aircraftsArrAfterFiltration: this.state.modelsSelectedScale,
      searchInputValue: ""
    });
    console.log("aircraftArray: ", aircrafts);
  };

  planeFiltration = () => {
    console.log("Planes")
    const planesArray = this.state.modelsSelectedScale.filter(item => item.aircraftType === "plane")
    console.log("planesArray: ", planesArray);
    this.setState({
      // isAll: false,
      // isPlanes: true,
      // isHelicopters: false,
      bgColor: 'yellow',
      aircraftTitle: "Магазин моделей літаків",
      aircraftArray: planesArray,
      activeButton: "planesButton",
      isCartButton: false, //! тригер: "якщо активна кнопка «Кошик»"
      aircraftsArrAfterFiltration: planesArray,
      searchInputValue: ""
    });
  };

  biplanesFiltration = () => {
    console.log("Biplanes")
    const biplanesArray = this.state.modelsSelectedScale.filter(item => item.aircraftType === "biplane")
    console.log("biplanesArray: ", biplanesArray);
    this.setState({
      // isAll: false,
      // isPlanes: true,
      // isHelicopters: false,
      bgColor: '#f59aa9',
      aircraftTitle: "Магазин моделей біпланів",
      aircraftArray: biplanesArray,
      activeButton: "biplanesButton",
      isCartButton: false, //! тригер: "якщо активна кнопка «Кошик»"
      aircraftsArrAfterFiltration: biplanesArray,
      searchInputValue: ""
    });
  };

  helicopterFiltration = () => {
    console.log("Helicopters")

    const helicoptersArray = this.state.modelsSelectedScale.filter(item => item.aircraftType === "helicopter")
    console.log("helicoptersArray: ", helicoptersArray);
    this.setState({
      // isAll: false,
      // isPlanes: false,
      // isHelicopters: true,
      bgColor: 'lightblue',
      aircraftTitle: "Магазин моделей вертольотів",
      aircraftArray: helicoptersArray,
      activeButton: "helicoptersButton",
      isCartButton: false, //! тригер: "якщо активна кнопка «Кошик»"
      aircraftsArrAfterFiltration: helicoptersArray,
      searchInputValue: ""
    });

  }

  cartFiltration = () => {
    console.log("Корзина")

    const title = this.state.indicesSelectedModels.length == 0 ? "Додайте товари до кошика" : "Кошик"

    // console.log("cartArray: ", cartArray);
    this.setState({
      // isAll: false,
      // isPlanes: false,
      // isHelicopters: true,
      bgColor: 'lightblue',
      aircraftTitle: title,
      // aircraftArray: this.state.selectedModels,
      activeButton: "cartButton",
      isCartButton: true,
      searchInputValue: "" //! тригер: "якщо активна кнопка «Кошик»"
    });
  }

  getActiveId = (id) => {
    console.log("id: ", id)
    //! треба створити триггер, який аналізує де натиснута кнопка додати до кошику
    // this.setState({
    //   activeButtonIndex: id,
    // })

    if (this.state.indicesSelectedModels.includes(id)) {
      console.log("Такий індекс вже є,тоді ВИДАЛЯЄМО його!❌");

      //! не = this.state.indicesSelectedModels, а = [...this.state.indicesSelectedModels], бо при 1 варіанті ми даємо посилання замість копії, це зламає роботу state
      const idArray = [...this.state.indicesSelectedModels]

      //! index - 1 замість newindicesSelectedModels.indexOf(index) не працює!
      idArray.splice(idArray.indexOf(id), 1);
      this.setState({
        indicesSelectedModels: idArray
      })
    }
    else {
      console.log("Такого індекса ще немає,тоді ДОДАЄМО його!✅");

      this.setState({
        // activeButtonIndex: index,
        indicesSelectedModels: [...this.state.indicesSelectedModels, id].sort((a, b) => a - b)
      });
    }

    this.updateSelectedModels()

  }

  //! Обробка введених даних для пошуку(фільтрації) карток за ім'ям або іншими параметрами

  //todo var.1 ✅
  // handleChangeInputSearchValue = ( value ) => {
  //   console.log("Подія в input search: ");
  //   console.log("value: ", value);
  // }
  //todo

  performSearch = textInput => {
    let onlyInputSearchValue;

    // const onlyInputSearchValue = this.state.aircraftsArrAfterFiltration.filter(item => item.name.brief.toLowerCase().startsWith(inputData.trim().toLowerCase()));

    //todo Потрібно використати switch та при кожному значенні радіо кнопок використати перний case для їхньої фільтрації, case - фільтр що за певних умов фільтрує елементи


    switch (this.state.radioButtonValue) {
      case "brief":
        //! за іменем
        this.state.isCartButton
          ? onlyInputSearchValue = this.state.selectedModelsArrAfterFiltration.filter(item => item.name.brief.toLowerCase().startsWith(textInput.trim().toLowerCase()))
          : onlyInputSearchValue = this.state.aircraftsArrAfterFiltration.filter(item => item.name.brief.toLowerCase().startsWith(textInput.trim().toLowerCase()));

        break;

      case "nickname":
        //! за прізвиськом
        this.state.isCartButton
          ? onlyInputSearchValue = this.state.selectedModelsArrAfterFiltration.filter(item => item.name.nickname.toLowerCase().includes(textInput.trim().toLowerCase()))
          : onlyInputSearchValue = this.state.aircraftsArrAfterFiltration.filter(item => item.name.nickname.toLowerCase().includes(textInput.trim().toLowerCase()));

        break;

      case "country":
        //    //! за країною виробником
        this.state.isCartButton
          ? onlyInputSearchValue = this.state.selectedModelsArrAfterFiltration.filter(item => item.info.countries.some((item =>
            item.trim().toLowerCase().startsWith(textInput.trim().toLowerCase()))))
          : onlyInputSearchValue = this.state.aircraftsArrAfterFiltration.filter(item => item.info.countries.some((item =>
            item.trim().toLowerCase().startsWith(textInput.trim().toLowerCase()))))

        break;

      case "year":
        //! за роком випуску
        this.state.isCartButton
          ? onlyInputSearchValue = this.state.selectedModelsArrAfterFiltration.filter(item => String(item.info.year).startsWith(textInput.trim()))
          : onlyInputSearchValue = this.state.aircraftsArrAfterFiltration.filter(item => String(item.info.year).startsWith(textInput.trim()));

        break;

      default:
        console.log("Invalid");
    }

    console.log("✅onlyInputSearchValue: ", onlyInputSearchValue);

    this.state.isCartButton
      ? this.setState({
        // inputSearchValue: inputData,
        selectedModels: onlyInputSearchValue,
        // searchInputValue: event.target.value,
      })
      : this.setState({
        // inputSearchValue: inputData,
        aircraftArray: onlyInputSearchValue,
        // searchInputValue: event.target.value
      })
  }


  debouncedSearch = debounce((text) => {
    console.log("⏰debounce_text", text);
    this.performSearch(text);
  }, 500);

  //todo var.2 ✅
  handleChangeInputSearchValue = (event) => {
    console.log("Подія в input search: ");
    console.log("event: ", event)
    const inputData = event.target.value;

    this.setState({
      searchInputValue: inputData
    })

    //! потрібно отримати масив з елементом або елементами з aircrafts, назва якого/яких містить символ з inputData на початку властивості name.brief

    //! 6.1 .Переносимо всю логіку фільтрації в окремий метод performSearch:
    //! _____________Логіка фільтрації___________
    // let onlyInputSearchValue;

    // // const onlyInputSearchValue = this.state.aircraftsArrAfterFiltration.filter(item => item.name.brief.toLowerCase().startsWith(inputData.trim().toLowerCase()));

    // //todo Потрібно використати switch та при кожному значенні радіо кнопок використати перний case для їхньої фільтрації, case - фільтр що за певних умов фільтрує елементи


    // switch (this.state.radioButtonValue) {
    //   case "brief":
    //   //! за іменем
    //   this.state.isCartButton
    //     ? onlyInputSearchValue = this.state.selectedModelsArrAfterFiltration.filter(item => item.name.brief.toLowerCase().startsWith(inputData.trim().toLowerCase()))
    //     : onlyInputSearchValue = this.state.aircraftsArrAfterFiltration.filter(item => item.name.brief.toLowerCase().startsWith(inputData.trim().toLowerCase()));

    //     break;

    //   case "nickname":
    //     //! за прізвиськом
    //     this.state.isCartButton
    //           ? onlyInputSearchValue = this.state.selectedModelsArrAfterFiltration.filter(item => item.name.nickname.toLowerCase().includes(inputData.trim().toLowerCase()))
    //       : onlyInputSearchValue = this.state.aircraftsArrAfterFiltration.filter(item => item.name.nickname.toLowerCase().includes(inputData.trim().toLowerCase()));

    //     break;

    //   case "country":
    //     //    //! за країною виробником
    //     this.state.isCartButton
    //       ? onlyInputSearchValue = this.state.selectedModelsArrAfterFiltration.filter(item => item.info.countries.some((item =>
    //         item.trim().toLowerCase().startsWith(inputData.trim().toLowerCase()))))
    //       : onlyInputSearchValue = this.state.aircraftsArrAfterFiltration.filter(item => item.info.countries.some((item =>
    //         item.trim().toLowerCase().startsWith(inputData.trim().toLowerCase()))))

    //     break;

    //   case "year":
    //     //! за роком випуску
    //     this.state.isCartButton
    //       ? onlyInputSearchValue = this.state.selectedModelsArrAfterFiltration.filter(item => String(item.info.year).startsWith(inputData.trim()))
    //       : onlyInputSearchValue = this.state.aircraftsArrAfterFiltration.filter(item => String(item.info.year).startsWith(inputData.trim()));

    //     break;

    //   default:
    //     console.log("Invalid");
    // }

    // console.log("✅onlyInputSearchValue: ", onlyInputSearchValue);
    //! _________________________________________

    //! 6.2 Запуск debounce з логікою фільтрації:
    this.debouncedSearch(inputData);



    // console.log("value: ", event.target.value);

  }

  //! припинення роботи debounce
  componentWillUnmount() {
    this.debouncedSearch.cancel();
  };

  // //* Якщо користувач буде вводити: . + * ? [ ] ( )
  // //* то RegExp потрібно екранувати допоміжною функцією:
  // escapeRegExp = (str) => {
  //   return str.replace(
  //     /[.*+?^${}()|[\]\\]/g,
  //     "\\$&"
  //   );
  // };

  // //* Використання RegExp з экрануванням допоміжною функцією:
  // highlightTextProtection = (text, keyword) => {
  //   if (!keyword) return text;

  //   const escapedKeyword = this.escapeRegExp(keyword);

  //   const regex = new RegExp(
  //     `(${escapedKeyword})`,
  //     "gi"
  //   );

  //   return text
  //     .split(regex)
  //     .map((part, index) =>
  //       part.toLowerCase() === keyword.toLowerCase()
  //         ? (
  //           <span
  //             key={index}
  //             className={css.highlight}
  //           >
  //             {part}
  //           </span>
  //         )
  //         : part
  //     );
  // };

  test = (value) => {
    console.log("value: ", value);
  }

  handleChangeRadioButtonValue = event => {
    console.log("Подія радіо кнопки");
    const target = event.target.value;
    // console.log("target: ", target);
    let placeHolder = "";

    switch (target) {
      case "brief":
        placeHolder = "Введіть назву ЛА"
        break;

      case "nickname":
        placeHolder = "Введіть прізвисько ЛА"
        break;

      case "country":
        placeHolder = "Введіть країну виробництва ЛА"
        break;

      case "year":
        placeHolder = "Введіть рік випуску ЛА"
        break;

      default:
        console.log("Invalid");
    }

    let array = [];

    this.setState({
      radioButtonValue: target,
      inputSearchPlaceholder: placeHolder,
      searchInputValue: "",
      aircraftArray: this.state.aircraftsArrAfterFiltration,
      selectedModels: this.state.selectedModelsArrAfterFiltration
    })

  }



  //! Формуємо(оновлюємо) масив обраних моделей [selectedModels], імпортуємо

  updateSelectedModels = () => {
    console.log("Функція updateSelectedModels")
    // const temSelectedModels = this.state.indicesSelectedModels.flatMap((item) => aircrafts.filter((el) => item === el.id));

    // console.log("temSelectedModels: ", temSelectedModels);

    //   //todo var.1
    //   // this.state.isCartButton
    //   //   ? this.setState(
    //   // prevState =>
    //   // ({
    //   //   aircraftArray: prevState.indicesSelectedModels.flatMap((item) => aircrafts.filter((el) => item === el.id))
    //   //     }))
    //   //   : this.setState(
    //   //     prevState =>
    //   //     ({
    //   //       selectedModels: prevState.indicesSelectedModels.flatMap((item) => aircrafts.filter((el) => item === el.id))
    //   //     }))

    //   //todo var.2
    this.setState(
      prevState =>
      ({
        selectedModels: prevState.indicesSelectedModels.flatMap((item) => aircrafts.filter((el) => item === el.id)),
        selectedModelsArrAfterFiltration: prevState.indicesSelectedModels.flatMap((item) => aircrafts.filter((el) => item === el.id))
      }))

    //   //todo var.3
    // return temSelectedModels
  }


  //!Фільтрація var.2
  // allFiltration = () => {
  //   console.log("new All")
  //   return "Магазин моделей літальних апаратів"
  // };

  // planeFiltration = () => {
  //   console.log("new Planes")
  //   return "Магазин моделей літаків"
  // };

  // helicopterFiltration = () => {
  //   console.log("new Helicopters")
  //   return "Магазин моделей вертольотів"
  // };

  //! Функція яка отримує масив моделей обраного масштабу з компоненту ScaleSelection та додає його в state
  getModelsSelectedScale = modelsScale => {
    console.log("Сюди приходить масив моделей обраного масштабу:", modelsScale);
    //todo  при виборі масштабу потрібно аналізувати стан фільтрів та згідно з обраного фільтру брати необхідний масив для подальшої роботи



    let result = [];

    switch (this.state.activeButton) {
      case "allButton":
        result = modelsScale
        break;

      case "planesButton":
        result = modelsScale.filter(item => item.aircraftType === "plane")
        break;

      case "biplanesButton":
        result = modelsScale.filter(item => item.aircraftType === "biplane")
        break;

      case "helicoptersButton":
        result = modelsScale.filter(item => item.aircraftType === "helicopter")
        break;
    }

    this.setState({
      modelsSelectedScale: modelsScale,
      aircraftArray: result,
      aircraftsArrAfterFiltration: result,
      searchInputValue: ""
    })
  }

  toggleModal = (event) => {
    console.log("🌀toggleModal", event);
    // console.log("🌀toggleModal", event.currentTarget.textContent);

    const modalType = event ? event.currentTarget.textContent : undefined

    console.log("modalType: ", modalType)

    // this.setState({
    //   modalType
    // })

    //! якщо modalType = Registration або Login, то нам потрібно:
    //!  1. Залишити модалку відкритою
    //! 2. this.state.modalType = modalType
    //! якщо modalType != Registration або Login, то нам потрібно:
    //! 1. Закрити модалу 
    //! 2. this.state.modalType = ""

    modalType === "Registration" || modalType === "Login"
      ? this.setState({
        showModal: true,
        modalType
      })
      : this.setState(({ showModal }) => ({
        showModal: !showModal,
        modalType: ""
      }))

  }

  submitFormRegistration = (user) => {
    console.log("🧑‍⚕️user: ", user)
    this.setState(prevState => ({
      users: [...prevState.users, user],

      modalType: 'Login',

       //! Логіка скидання всіх форм та інпутів при зміни стану користувача

      bgColor: 'black',
      aircraftTitle: "Магазин моделей літальних апаратів",
      aircraftArray: aircrafts,
      activeButton: "allButton",
      isCartButton: false,
      searchInputValue: "", //! значення пошукового інпуту
      radioButtonValue: "brief", //! значення параметра для пошуку/фільтрації радіо-кнопки
      inputSearchPlaceholder: "Введіть назву ЛА", //! значення placeholder для inputSearch
      modelsSelectedScale: aircrafts,
    }))

     //! прокрутити сторінку вгору
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  accountLogin = (user) => {
    console.log("🧑‍⚕️user: ", user)

    console.log("🙆‍♂️Вхід в обліковий запис:", user.userEmail); //
    //! 1. Забираємо users з localStorage
    const users = JSON.parse(localStorage.getItem('users'));
    console.log("users: ", users)
    const activeUser = users.find(item => item.userEmail === user.userEmail)
    console.log("❗️🗣 Активний (авторизований) користувач__accountLogin:", activeUser); //!

    activeUser.isActive = true

    const activeUserId = users.findIndex(user => user.isActive === true)

    const selectedModelsId = activeUser.indicesSelectedModels

    console.log("selectedModelsId: ", selectedModelsId)

    localStorage.setItem(
      "users",
      JSON.stringify(users),
    );

    localStorage.setItem(
      "selectedModelsId",
      JSON.stringify(selectedModelsId)

    )

    console.log("users after: ", users)
    //todo var.1
    // this.setState({
    //   showModal: false
    // })

    //todo var.2
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      users,
      activeUser,
      activeUserId,
      indicesSelectedModels: selectedModelsId,
      selectedModels: (JSON.parse(localStorage.getItem("selectedModelsId")) || []).flatMap((item) => aircrafts.filter((el) => item === el.id)),

      //! Логіка скидання всіх форм та інпутів при зміни стану користувача

      bgColor: 'black',
      aircraftTitle: "Магазин моделей літальних апаратів",
      aircraftArray: aircrafts,
      activeButton: "allButton",
      isCartButton: false,
      searchInputValue: "", //! значення пошукового інпуту
      radioButtonValue: "brief", //! значення параметра для пошуку/фільтрації радіо-кнопки
      inputSearchPlaceholder: "Введіть назву ЛА", //! значення placeholder для inputSearch
      modelsSelectedScale: aircrafts,
    }))


    //! прокрутити сторінку вгору
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });

  }

  signOut = () => {
    console.log("⬇️Sign Out");

    const users = JSON.parse(localStorage.getItem("users"))

    console.log("users ДО: ", users);

    users[this.state.activeUserId].isActive = false

    console.log("users Після: ", users);

    localStorage.removeItem("selectedModelsId");

    this.setState({
      users,
      activeUser: null,
      activeUserId: null,
      showModal: true,
      modalType: "",
      selectedModels: (JSON.parse(localStorage.getItem("selectedModelsId")) || []).flatMap((item) => aircrafts.filter((el) => item === el.id)),
      indicesSelectedModels: JSON.parse(localStorage.getItem("selectedModelsId")) || [], //! масив індексів обраних моделей
      // selectedModelsArrAfterFiltration: (JSON.parse(localStorage.getItem("selectedModelsId")) || []).flatMap((item) => aircrafts.filter((el) => item === el.id)), //! дубльоване значення selectedModels після фільтрації

       //! Логіка скидання всіх форм та інпутів при зміни стану користувача

      bgColor: 'black',
      aircraftTitle: "Магазин моделей літальних апаратів",
      aircraftArray: aircrafts,
      activeButton: "allButton",
      isCartButton: false,
      searchInputValue: "", //! значення пошукового інпуту
      radioButtonValue: "brief", //! значення параметра для пошуку/фільтрації радіо-кнопки
      inputSearchPlaceholder: "Введіть назву ЛА", //! значення placeholder для inputSearch
      modelsSelectedScale: aircrafts,
    })

     //! прокрутити сторінку вгору
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  render() {

    const {
      bgColor,
      aircraftTitle,
      aircraftArray,
      activeButton,
      // activeButtonIndex,
      indicesSelectedModels,
      selectedModels,
      isCartButton,
      // inputSearchValue,
      searchInputValue,
      radioButtonValue,
      inputSearchPlaceholder,
      selectedModelsArrAfterFiltration,
      modelsSelectedScale,
      showModal,
      modalType,
      users,
      activeUser,
      activeUserId,
      modelScale
    } = this.state;

    //! Формуємо(оновлюємо) масив обраних моделей [selectedModels]
    // const selectedModels = indicesSelectedModels.flatMap((item) => aircrafts.filter((el) => item === el.id))
    //! Приклад початкового сортування на ім'я (за полем name.brief)
    // const selectedModels = updateSelectedModels(indicesSelectedModels, aircrafts).sort((firstModel, secondModel) => firstModel.name.brief.localeCompare(secondModel.name.brief));
    console.log("aircraftArray: ", aircraftArray);
    const totalTypes = isCartButton ? selectedModels.length : aircraftArray.length;

    //! Рахуємо загальну кількість моделей <totalModels> виходячи з наявності фактичної ціни
    const totalModelsArray = isCartButton
      ? selectedModels
        .flatMap(item => Object.values(item.model.colorsPrice)
          .filter(value => value > 0))
      : aircraftArray
        .flatMap(item => Object.values(item.model.colorsPrice)
          .filter(value => value > 0));

    const totalModels = totalModelsArray.length
    console.log("------------------------------------------------------------");
    console.log("aircraftArray: ", aircraftArray);
    // console.log("activeButtonIndex: ", activeButtonIndex);
    console.log("indicesSelectedModels: ", indicesSelectedModels);
    console.log('selectedModels: ', selectedModels);
    console.log("Кількість типів ЛА:", totalTypes);
    console.log("загальну кількість моделей <totalModels>", totalModels);
    // console.log("inputSearchValue: ", inputSearchValue);
    console.log("searchInputValue: ", searchInputValue);
    console.log("radioButtonValue: ", radioButtonValue);
    console.log("inputSearchPlaceholder: ", inputSearchPlaceholder);
    console.log("selectedModelsArrAfterFiltration: ", selectedModelsArrAfterFiltration);
    console.log("🟢modelsSelectedScale: ", modelsSelectedScale);
    console.log("showModal: ", showModal);
    console.log("modalType: ", modalType);
    console.log("users: ", users);
    console.log("🗣 Активний (авторизований) користувач:", activeUser);
    console.log("#️⃣🗣 Індекс Активного(авторизованого) користувача", activeUserId);
    console.log("------------------------------------------------------------");

    this.test('Виклик тестової функції')


    return (
      <>
        {/*//!  Filter */}
        {/* <div className={css.filterBox}>
                <button
                    className={css.buttonAllFiltration}
                    type="button"
                    onClick={this.allFiltration}
                >
                    ВСІ
                </button>
        
                <button
                    className={css.buttonPlaneFiltration}
                    type="button"
                    onClick={this.planeFiltration}
                >
                    Літаки
                </button>
        
                <button
                    className={css.buttonHelicopterFiltration}
                    type="button"
                    onClick={this.helicopterFiltration}
                >
                    Вертольоти
                </button>
        
                </div> */}

        <RegistrationIdentification
          onClose={this.toggleModal}
          activeUser={activeUser}
          onSignOut={this.signOut}
        />

        {showModal && <ModalRegistrationIdentification
          onClose={this.toggleModal}
        >
          {!modalType && <FormChoiceRegistrationOrIdentification
            onClose={this.toggleModal}
          />}
          {modalType === 'Registration' && <FormRegistration
            onSubmit={this.submitFormRegistration}
            onClose={this.toggleModal}
          />}
          {modalType === 'Login' && <FormIdentification
            onAccountLogin={this.accountLogin}
            onClose={this.toggleModal}
          />}
        </ModalRegistrationIdentification>}

        <ScaleSelection
          onGetModelsSelectedScale={this.getModelsSelectedScale}
          modelScale={modelScale} //! початковий масштаб моделі в ScaleSelection
        />
        <Filter
          onAll={this.allFiltration}
          onPlanes={this.planeFiltration}
          onBiplanes={this.biplanesFiltration}
          onHelicopters={this.helicopterFiltration}
          onCart={this.cartFiltration}
          //! Візуалізація активної кнопки 
          activeButton={activeButton}
          selectedLength={indicesSelectedModels.length}
          activeUser={activeUser}
        />

        <Sorter
          onHandleChangeInputSearchValue={this.handleChangeInputSearchValue}
          searchInputValue={searchInputValue}
          onHandleChangeRadioButtonValue={this.handleChangeRadioButtonValue}
          radioButtonValue={radioButtonValue} //! значення параметра для пошуку/фільтрації радіо-кнопки
          inputSearchPlaceholder={inputSearchPlaceholder}
        />

        {/* <Section
          isOn={this.state.isPlanes}
          title="Магазин моделей літаків"
          bgColor={this.state.bgColor}
        >
          <PlanesList items={planes} />
        </Section >
        <Section
          isOn={this.state.isHelicopters}
          title="Магазин моделей гелікоптерів"
          bgColor={this.state.bgColor}
        >
          <PlanesList items={helicopters} />
        </Section > */}
        <Section
          // isOn={this.state.isAll}
          title={aircraftTitle}
          bgColor={bgColor}
          totalTypes={totalTypes}
          totalModels={totalModels}
          selectedModels={selectedModels}
          isCartButton={isCartButton}
        >
          <PlanesList
            //todo var.1
            // items={aircraftArray}
            //todo var.2
            //! Приклад початкового сортування на ім'я (за полем name.brief)
            // items={
            //   isCartButton
            //   ? selectedModels.sort((firstModel, secondModel) => firstModel.name.brief.localeCompare(secondModel.name.brief))
            //     : aircraftArray.sort((firstModel, secondModel) => firstModel.name.brief.localeCompare(secondModel.name.brief))}

            items={isCartButton
              ? selectedModels
              : aircraftArray}
            onActiveId={this.getActiveId}
            indicesSelectedModels={indicesSelectedModels}
            totalModels={totalModels}
            // onHighlightTextProtection={this.highlightTextProtection}
            searchInputValue={searchInputValue}
            radioButtonValue={radioButtonValue}
            activeuser={activeUser}
          />
        </Section >
        {/* <Section
          // isOn={this.state.isPlanes}>
          title="Магазин моделей літаків"
          <PlanesList items={aircrafts} />
        </Section > */}
      </>
    )
  }
}