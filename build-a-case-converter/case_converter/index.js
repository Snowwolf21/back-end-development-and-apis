const getUpperCase = (arg) => {
return arg.toUpperCase();
};
const getLowerCase = (arg) => {
    return arg.toLowerCase();
}

const getSentenceCase = (arg) => {
    return arg[0].toUpperCase() + arg.slice(1).toLowerCase();

};

const getProperCase = (arg) => {
   return arg.split(' ')
   .map(
    (word) => getSentenceCase(word)
   ).join(' ');
};

module.exports = {
    getUpperCase,
    getLowerCase,
    getSentenceCase,
    getProperCase
};