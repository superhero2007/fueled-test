let items = [
  {
    image: require("../../assets/image/1.png"),
    name: "Jet Ski",
    id: "434556256",
    price: 1500,
    quantity: 1,
    removable: true
  },
  {
    image: require("../../assets/image/2.png"),
    name: "Bubble Wrap",
    id: "345245865",
    price: 440,
    quantity: 1,
    removable: true
  },
  {
    image: require("../../assets/image/3.png"),
    name: "Crock-Pot",
    id: "987123654",
    price: 55,
    quantity: 1,
    removable: true
  }
];

export default {
  getItems() {
    return new Promise(resolve => {
      return resolve({
        data: items
      });
    });
  },
  setItems(items) {
    return new Promise(resolve => {
      return resolve({
        msg: "set items success!"
      });
    });
  }
};
