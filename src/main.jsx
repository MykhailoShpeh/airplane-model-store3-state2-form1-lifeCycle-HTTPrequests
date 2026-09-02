import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import '@/index.css'
// import { App } from '@/components/App/App.jsx';
// import { AppCounter } from '@/components/App/AppCounter.jsx';
// import { AppColorBox } from "@/components/App/AppColorBox.jsx"
// import { AppSearchDebounce } from './components/AppSearchDebounce/AppSearchDebounce';
//! Aбсолютний шлях + Реекспорт
import {
  App,
  AppColorBox,
  AppSearchDebounce, //! Пошук елементів + Debounce
  // AppSearchDebounceTextBacklight, //! Пошук елементів + Debounce + Підсвічування тексту
  AppUncontrolledElementsForm, //! 4.4.1.Неконтрольовані елементи форм
  AppControlledElementsForm, //! 4.4.2.Контрольовані елементи форм
  AppComplexForms //! 4.4.3.Складні форми
} from '@/components/App';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <BrowserRouter basename="/airplane-model-store3-state2-form1-lifeCycle-HTTPrequests"> */}
    <BrowserRouter basename="/airplane-model-store3-state2-form1-lifeCycle-HTTPrequests">
      <App />
      {/* <AppColorBox />  */}
      {/* <AppSearchDebounce /> */}
      {/* <AppSearchDebounceTextBacklight /> */}
      {/* <AppUncontrolledElementsForm onSubmit={values => console.log(values)} /> */}
      {/* <AppControlledElementsForm /> */}
      {/* <AppComplexForms onSubmit={values => console.log(values)}/> */}
      {/* <AppComplexForms /> */}
    </BrowserRouter>
  </StrictMode >
);

