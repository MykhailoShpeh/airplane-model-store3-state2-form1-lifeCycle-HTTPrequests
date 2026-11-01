export function sortsAircrafts(aircrafts) {
    const sortedAircrafts = [...aircrafts].sort((a, b) =>
        a.name.brief.localeCompare(b.name.brief)
    );

    const arrayYes = sortedAircrafts.filter(item => item.model.actualImages);

    const arrayNo = sortedAircrafts.filter(item => !item.model.actualImages);

    console.log("arrayYes: ", arrayYes);
    console.log("arrayNo: ", arrayNo);

    sortedAircrafts.splice(0, sortedAircrafts.length);
    sortedAircrafts.length = 0;

    sortedAircrafts.push(...arrayYes, ...arrayNo)

    return sortedAircrafts
}