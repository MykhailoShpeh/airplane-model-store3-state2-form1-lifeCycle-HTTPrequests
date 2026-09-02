import PropTypes from 'prop-types';

import css from "./PlanesList.module.css";

import { Planes } from '@/components/Planes/Planes.jsx';

import { getBgColorCSSModule } from '@/utils/getBackgroundColor.js';




//! Для визначення кольору фону картки в залежності від значення "year"

export function PlanesList({
    items,
    onActiveId,
    indicesSelectedModels,
    totalModels,
    // onHighlightTextProtection,
    searchInputValue,
    radioButtonValue,
    activeuser
}) {
    // console.log(getBgColorCSSModule(2000))

    // console.log("items: ", items)
    console.log("totalModels: ", totalModels);
    return (
        <>
            {
                totalModels == 0
                    ? <h3 className={css.searchTitle}>Нічого не знайдено... 😔</h3>
                    : <ul
                        className={css.list}>
                        {items.map(item =>
                            <li
                                className={css[getBgColorCSSModule(item.info.year)]}
                                key={item.id} >
                                <Planes
                                    id={item.id}
                                    urlMain={item.url.main}
                                    urlPromotional={item.url.promotional}
                                    urlActual={item.model.actualImages}
                                    urlActualFull={item.model.actualFullImages}
                                    nameBrief={item.name.brief}
                                    nameFull={item.name.full}
                                    nickname={item.name.nickname}
                                    year={item.info.year}
                                    startTime={item.manufacturing.start}
                                    endTime={item.manufacturing.end}
                                    countries={item.info.countries}
                                    type={item.info.type}
                                    price={item.info.price}
                                    description={item.info.description}
                                    backgroundCardTitle={item.aircraftType}
                                    onActiveId={onActiveId}
                                    indicesSelectedModels={indicesSelectedModels}
                                    // onHighlightTextProtection={onHighlightTextProtection}
                                    searchInputValue={searchInputValue}
                                    radioButtonValue={radioButtonValue}
                                    modelColorPrice={item.model.colorsPrice}
                                    activeuser={activeuser}
                                />
                            </li>
                        )}
                    </ul>
            }
        </>
    )
}

PlanesList.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
        }),
    ),
};
