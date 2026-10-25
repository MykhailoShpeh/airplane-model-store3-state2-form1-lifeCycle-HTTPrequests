import PropTypes from 'prop-types';
import css from "./Section.module.css"; //! CSS-модулі
// import css from "@/components/Section/Section.module.css";

export function Section({
    isOn = true,
    title,
    children,
    bgColor,
    totalTypes,
    totalModels,
    selectedModels,
    isCartButton,
    selectedModelsArrAfterFiltration
}) {
    return (
        !selectedModels.length && !selectedModelsArrAfterFiltration.length && isCartButton ? <h1 className={css.nullTitle}>Додайте товар до кошику</h1> :
            <>
                {isOn &&
                    <section style={{ backgroundColor: bgColor, }}>
                        {/* //! CSS-модулі з композицією класів */}
                        {/* {title && <h2 className={`${css.title} ${css.robotoBold}`}>{title}</h2>} */}
                        {/* //! CSS-модулі з composes */}
                        {title && <h2 className={css.titleRobotoBold}>{title}</h2>}
                        <h3 className={css.titleTotalTypes}>Кількість типів ЛА: <span>{totalTypes}</span></h3>
                        <h3 className={css.titleTotaModals}>Загальна кількість моделей: <span>{totalModels}</span></h3>
                        {children}
                    </section>}
            </>
    );
}

Section.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node,
};