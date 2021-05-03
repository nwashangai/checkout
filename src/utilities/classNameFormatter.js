export default (classConditions, otherClasses = '') => {
  const className = Object.keys(classConditions)
    .reduce((formattedClasses, currentClass) => {
      const showClass = classConditions[currentClass]

      return showClass
        ? formattedClasses.concat(` ${currentClass}`)
        : formattedClasses
    }, '')
    .trim()

  return otherClasses ? className.concat(` ${otherClasses}`) : className
}
