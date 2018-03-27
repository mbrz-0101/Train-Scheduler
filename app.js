      function replaceString(string, index, replacement) {
        return string.substr(0, index) + replacement + string.substr(index + replacement.length);
      }

      console.log(moment().format());
      var config = {
        apiKey: "AIzaSyDVCJJXeaRGHfIB5NjHXc2ErOLmUmloDLw",
        authDomain: "first-firebase-pro-b5ceb.firebaseapp.com",
        databaseURL: "https://first-firebase-pro-b5ceb.firebaseio.com",
        projectId: "first-firebase-pro-b5ceb",
        storageBucket: "first-firebase-pro-b5ceb.appspot.com",
        messagingSenderId: "233254861530"
      };

      firebase.initializeApp(config);

      // Create a variable to reference the database.
      var database = firebase.database();

      let name = "";
      let destination = "";
      let firstTrainTime = "";
      let frequency = 0;

      $("#add-train").on('click', function (event) {
        event.preventDefault();

        let firstTrainTimeInput = $("#start-time-input").val().trim() + ":00";
        let nowMoment = moment().format();

        name = $("#name-input").val().trim();
        destination = $("#destination-input").val().trim();
        firstTrainTime = replaceString(nowMoment, 11, firstTrainTimeInput);
        frequency = $("#frequency-input").val().trim();

        database.ref().push({
          name: name,
          destination: destination,
          firstTrain: firstTrainTime,
          frequency: frequency,
          dateAdded: firebase.database.ServerValue.TIMESTAMP
        });

      });

      database.ref().orderByChild("name").on("child_added", function (childSnapshot) {

        let nRow = $("<tr>");
        let ntd1 = $("<td>");
        let ntd2 = $("<td>");
        let ntd3 = $("<td>");
        let ntd4 = $("<td>");
        let ntd5 = $("<td>");

        // let nextArrival = moment(childSnapshot.val().frequency).format("HH:mm");
        // console.log(typeof nextArrival);
        // let minutesAway = moment().diff(moment(childSnapshot.val().startDate, "DDMMYY"), 'months');
        let nextArrival = moment(childSnapshot.val().firstTrain).format("HH:mm");
        let minutesAway = moment().diff(moment(childSnapshot.val().firstTrain), 'minutes');

        ntd1.text(childSnapshot.val().name);
        ntd2.text(childSnapshot.val().destination);
        ntd3.text(childSnapshot.val().frequency);
        ntd4.text(nextArrival);
        ntd5.text(minutesAway);

        nRow.append(ntd1);
        nRow.append(ntd2);
        nRow.append(ntd3);
        nRow.append(ntd4);
        nRow.append(ntd5);

        $("tbody").append(nRow);

      }, function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
      });