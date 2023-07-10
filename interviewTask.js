// let input_data = "I love dogs";
// let splitWordWise = input_data?.split(" ");
// let concatWord = "";

// for (var i = 0; i < splitWordWise?.length; i++) {
//   let splitedData = splitWordWise[i]?.split("");
//   for (var j = splitedData?.length - 1; j >= 0; j--) {
//     concatWord = concatWord + splitedData[j];
//   }
//   concatWord = concatWord + " ";
// }

// console.log(concatWord);

var num_of_rows = 4;
let concatWord = "";
for (var i = 0; i < num_of_rows; i++) {
  for (var j = num_of_rows - 1; j > 0; j--) {
    if (j < num_of_rows) {
      concatWord = concatWord + " ";
    } else {
      concatWord = concatWord + "* ";
    }
    console.log(concatWord);
  }
  console.log();
}
