$(() => {
  class Task {
    constructor() {
      this.firstTaskResult = $("#firstTaskResult");
      this.secondTaskResult = $("#secondTaskResult");
      this.thirdTaskResult = $("#thirdTaskResult");
      this.fourthTaskResult = $("#fourthTaskResult");

      this.taskListCheckboxes = $(".taskCheckbox");

      this.ftToggle = false;
      this.stToggle = false;
      this.initBoxPosition = "left";
      this.inputValue = "";
      this.fifthToggle = true;
    }

    firstTaskFn = (e) => {
      this.taskListCheckboxes.eq(0).addClass("checked");
      if (!this.ftToggle) {
        this.firstTaskResult.find("p").animate({
          right:
            this.firstTaskResult.width() -
            this.firstTaskResult.find("p").innerWidth(),
          opacity: 1,
        });
        this.ftToggle = !this.ftToggle;
        return;
      }

      if (this.ftToggle) {
        this.firstTaskResult.find("p").animate({ right: "0px", opacity: 0 });
        this.ftToggle = !this.ftToggle;
        return;
      }
    };

    secondTaskFn = (e) => {
      this.taskListCheckboxes.eq(1).addClass("checked");
      $("#secondTaskRealRadio").prop("checked", !this.stToggle);

      if (!this.stToggle) {
        $(e.currentTarget).addClass("activeRadio");
      } else {
        $(e.currentTarget).removeClass("activeRadio");
      }

      this.secondTaskResult
        .find("p")
        .animate({ left: !this.stToggle ? "25px" : "0px" });
      this.stToggle = !this.stToggle;
      return;
    };

    thirdTaskFn = (dragItemPos) => {
      $("#dragItem").text(dragItemPos === "left" ? "👈" : "👉");

      if (this.initBoxPosition !== "" && dragItemPos === "left") {
        this.thirdTaskResult
          .find("p")
          .text("Going to Left")
          .animate({ left: "25px" });
        return;
      }

      if (dragItemPos === "left") {
        this.thirdTaskResult
          .find("p")
          .text("Going to Left")
          .animate({ left: "25px" });
        return;
      }

      if (dragItemPos === "right") {
        this.thirdTaskResult
          .find("p")
          .text("Going to Right")
          .animate({ left: "0" });
        return;
      }
    };

    thirdTaskFn_Drag = (e) => {
      e.originalEvent.dataTransfer.setData("id", e.target.id);
    };

    thirdTaskFn_AllowDrop = (e) => {
      e.preventDefault();
    };

    thirdTaskFn_Drop = (dragItemPos, e) => {
      this.taskListCheckboxes.eq(2).addClass("checked");
      e.preventDefault();
      const data = e.originalEvent.dataTransfer.getData("id");

      $(e.target).append($(`#${data}`));

      this.thirdTaskFn(dragItemPos);
    };

    fourthTaskFn = (e) => {
      if (e.target.value.length > this.inputValue.length) {
        const lastLetter = e.target.value.charAt(e.target.value.length - 1);
        $("#fourthTaskResult")
          .append(`<span>${lastLetter}</span>`)
          .find("span:last-child")
          .animate(
            { opacity: 1, left: "0rem" },
            {
              complete: () => {
                this.taskListCheckboxes.eq(3).addClass("checked");
                this.inputValue = e.target.value;
              },
            }
          );
      }

      if (e.target.value.length === 0) {
        this.inputValue = e.target.value;
        $("#fourthTaskResult span").each(function () {
          if (this !== undefined) {
            $(this).animate(
              { opacity: 0, left: "1rem" },
              {
                complete: function () {
                  $(this).remove();
                },
              }
            );
          }
        });
      }
    };

    fourthTaskFn_keyUp = (e) => {
      const keyCode = e.keyCode;

      if (keyCode === 8 || keyCode === 46) {
        console.log(`keycode ${keyCode}`);
        $("#fourthTaskResult")
          .find("span:last-child")
          .animate(
            { opacity: 0, left: "1rem" },
            {
              complete: () => {
                this.inputValue = e.target.value;
                $("#fourthTaskResult span:last-child").remove();
              },
            }
          );
      }
    };

    fifthTaskFn = (toggle, e) => {
      e.stopPropagation();
      if (toggle) {
        $("#fifthTask")
          .animate(
            {
              left:
                $(".fifthTaskSwitchContainer").width() -
                $("#fifthTask").innerWidth(),
            },
            {
              complete: () => {
                this.taskListCheckboxes.eq(4).addClass("checked");
                $("html").attr("data-theme", "dark");
              },
            }
          )
          .find("h3")
          .text("Click anywhere to turn back light mode");
        return;
      }

      if (!toggle) {
        $("#fifthTask")
          .animate(
            { left: "0px" },
            {
              complete: () => {
                $("html").removeAttr("data-theme");
              },
            }
          )
          .find("h3")
          .text("Click me to see some magic");
        return;
      }
    };

    init = () => {
      // click event first task
      $("#firstTask").on("click", this.firstTaskFn);
      // click event second task
      $("#secondTask").on("change", this.secondTaskFn);
      $("#customRadio").on("click", this.secondTaskFn);
      // third task events
      $("#dragItem").on("dragstart", this.thirdTaskFn_Drag);

      $(".rightDrop")
        .on("drop", (e) => {
          this.thirdTaskFn_Drop("left", e);
        })
        .on("dragover", this.thirdTaskFn_AllowDrop);

      $(".leftDrop")
        .on("drop", (e) => {
          this.thirdTaskFn_Drop("right", e);
        })
        .on("dragover", this.thirdTaskFn_AllowDrop);
      // end third task events

      // fourth task
      $("#textInput")
        .on("keydown", this.fourthTaskFn_keyUp)
        .on("input", this.fourthTaskFn);

      // fifth task
      $("#fifthTaskHeader").on("click", (e) => this.fifthTaskFn(true, e));
      $("html").on("click", (e) => this.fifthTaskFn(false, e));
    };
  }

  const task = new Task();

  task.init();
});
