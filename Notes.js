//get all values by a specific key, i.e "User"

db.collection("activity")
  .get()
  .then((singleActivity) => {
    singleActivity.docs.forEach((doc) => {
      console.log(doc.data().User);
    });
  });

//get all data from the collection

db.collection("activity")
  .get()
  .then((singleActivity) => {
    singleActivity.docs.forEach((doc) => {
      console.log(doc.data());
    });
  });

//get all data from a single document
db.collection("activity")
  .doc("VflsyLTv77AmNXj5VRXw")
  .get()
  .then((singleActivity) => {
    console.log(singleActivity.data());
  });
