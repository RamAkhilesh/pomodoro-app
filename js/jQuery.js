$(document).ready(function() {
  var interval;
  var pom = 25,
    sb = "05",
    lb = 15;
  var work = 1,
    work_count = 0,
    lb_interval = 4;
  var audioElement = document.createElement('audio');
  audioElement.setAttribute('src', 'alarm-audio.mp3');

  function checkTime(t) {
    if (t < 10) return "0" + t;
    else return t;
  }

  function display(m, s) {
    document.getElementById("minutes").innerHTML = checkTime(m);
    document.getElementById("seconds").innerHTML = checkTime(s);
    document.title = checkTime(m) + " : " + checkTime(s) + " left!";
  }

  function startTimer() {
    var min = document.getElementById("minutes").innerHTML;
    var sec = document.getElementById("seconds").innerHTML;
    interval = setInterval(function() {
      if (--sec < 0) {
        if (min == 0) {
          stopTimer();
          audioElement.play();
          if (work == 1) {
            work_count++;
            if (work_count < lb_interval) $("#sb").trigger("click");
            else {
              work_count = 0;
              $("#lb").trigger("click");
            }
          } else {
            $("#pom").trigger("click");
          }
        } else {
          sec = 59;
          min--;
          display(min, sec);
        }
      }
      else{
        display(min, sec);
      }
    }, 1000);
  }

  function stopTimer() {
    clearInterval(interval);
  }

  $("#start-stop").click(function() {
    var $this = $(this);
    $this.toggleClass("start stop");
    if ($this.hasClass("start")) {
      $this.text("START");
      stopTimer();
    } else {
      $this.text("STOP");
      startTimer();
    }
  });

  $("#pom").click(function() {
    clearInterval(interval);
    work = 1;
    $("title").text(pom + ":00 - Time to work!");
    $("body").animate(
      {
        backgroundColor: "rgb(235, 89, 86)"
      },
      800
    );
    $(".settings, .about").animate(
      {
        backgroundColor: "rgb(253, 106, 106)"
      },
      800
    );
    $("hr").animate(
      {
        backgroundColor: "rgba(171, 63, 63, 0.502)"
      },
      800
    );
    $(".container").animate(
      {
        backgroundColor: "rgb(253, 106, 106)"
      },
      300
    );
    $(".bttn").attr("class", "bttn");
    $("#pom").addClass("pom-active-btn");
    $("#minutes").text(pom);
    $("#seconds").text("00");
    $("#start-stop").attr("class", "start");
    $("#start-stop").text("START");
    $("#start-stop").css("color", "rgb(253, 106, 106)");
  });

  $("#sb").click(function() {
    clearInterval(interval);
    work = 0;
    $("title").text(sb + ":00 - Time for break!");
    $("body").animate(
      {
        backgroundColor: "rgb(64, 175, 179)"
      },
      800
    );
    $("hr").animate(
      {
        backgroundColor: "rgba(48, 130, 133, 0.5)"
      },
      800
    );
    $(".settings, .about").animate(
      {
        backgroundColor: "rgb(71, 188, 192)"
      },
      800
    );
    $(".container").animate(
      {
        backgroundColor: "rgb(71, 188, 192)"
      },
      300
    );
    $(".bttn").attr("class", "bttn");
    $("#sb").addClass("sb-active-btn");
    $("#minutes").text(sb);
    $("#seconds").text("00");
    $("#start-stop").attr("class", "start");
    $("#start-stop").text("START");
    $("#start-stop").css("color", "rgb(71, 190, 194)");
  });

  $("#lb").click(function() {
    clearInterval(interval);
    work = 0;
    $("title").text(lb + ":00 - Time for break!");
    $("body").animate(
      {
        backgroundColor: "rgb(105, 149, 207)"
      },
      800
    );
    $("hr").animate(
      {
        backgroundColor: "rgba(74, 106, 148, 0.5)"
      },
      800
    );
    $(".settings, .about").animate(
      {
        backgroundColor: "rgb(115, 163, 226)"
      },
      800
    );
    $(".container").animate(
      {
        backgroundColor: "rgb(115, 163, 226)"
      },
      300
    );
    $(".bttn").attr("class", "bttn");
    $("#lb").addClass("lb-active-btn");
    $("#minutes").text(lb);
    $("#seconds").text("00");
    $("#start-stop").attr("class", "start");
    $("#start-stop").text("START");
    $("#start-stop").css("color", "rgb(115, 163, 226)");
  });

  $(".settings").click(function() {
    $(".modal").css("display", "block");
  });

  $(".btn-close").click(function() {
    $(".modal").css("display", "none");
  });

  $(".btn-update").click(function() {
    pom = checkTime($("#pom-edit").val());
    sb = checkTime($("#sb-edit").val());
    lb = checkTime($("#lb-edit").val());
    lb_interval = $("#lb-interval").val();
    $(".modal").css("display", "none");
    $("#pom").trigger("click");
  });
});
