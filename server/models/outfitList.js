let outfitList = [];

const getAll = () => outfitList;

const add = (item, callback) => {
  const checker = outfitList.filter((data) => data.id === item.id);
  if (checker.length === 0) {
    outfitList.unshift(item);
    callback(null);
  } else {
    callback('already exist');
  }
};

const drop = (id, callback) => {
  for (let i = 0; i < outfitList.length; i += 1) {
    if (outfitList[i].id === id) {
      outfitList = outfitList.slice(0, i).concat(outfitList.slice(i + 1));
    }
  }
  callback(null);
};

module.exports = {
  getAll,
  add,
  drop,
};
