module.exports = async function (deadline) {
  const response = await this.notion.databases.query({
    database_id: this.connectDatabase,
  });

  for (let i = 0; i < response.results.length; i++) {
    if (response.results[i]["properties"]["Deadline"]["date"] != null) {
      if (
        response.results[i]["properties"]["Task"]["title"][0][
          "plain_text"
        ].includes(deadline)
      ) {
        console.log(
          "> Deadline Title: ",
          response.results[i]["properties"]["Task"]["title"][0]["plain_text"]
        );
        // console.log(response.results[i]['properties']['Taskee']['people']);

        // Print all the names of the people in a deadline
        const peopleArray =
          response.results[i]["properties"]["Taskee"]["people"];
        for (let j = 0; j < peopleArray.length; j++) {
          console.log("Officer Name: ", peopleArray[j]["name"]);
          console.log("Email: ", peopleArray[j]["person"]["email"]);
          console.log();
        }

        console.log(
          "Finish Date: ",
          response.results[i]["properties"]["Deadline"]["date"]["start"]
        );
        console.log("\n======================================================");
      }
    }
  }
};
