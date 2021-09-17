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
        .animate({ right: !this.stToggle ? this.secondTaskResult.width() - this.secondTaskResult.find('p').innerWidth() : "0px", opacity: !this.stToggle ? 1 : 0 });
      this.stToggle = !this.stToggle;
      return;
    };

    thirdTaskFn = (dragItemPos) => {
      $("#dragItem").text(dragItemPos === "left" ? "👈" : "👉");

      if (this.initBoxPosition !== "" && dragItemPos === "left") {
        this.thirdTaskResult
          .find("p")
          .animate({ right: "1.5rem" }, { complete: function(){
            $(this).text("Going to Left")
          } });
        return;
      }

      if (dragItemPos === "left") {
        this.thirdTaskResult
          .find("p")
          .animate({ right: "1.5rem" }, { complete: function(){
              $(this).text("Going to Left")
          } });
        return;
      }

      if (dragItemPos === "right") {
        this.thirdTaskResult
          .find("p")
          .animate({ right: this.thirdTaskResult.width() - this.thirdTaskResult.find("p").innerWidth() }, { complete: function(){
            $(this).text("Going to Right")
          } });
        return;
      }
    };
    

    thirdTaskFn_Drag = (e) => {
    if(e.type === "dragstart"){
        e.originalEvent.dataTransfer.setData("id", e.target.id);
        return
    }

    if(e.type === "touchmove"){
        const touchLocation = e.targetTouches[0]
        $('.dropBox').css({ position: "static" })
        $(e.currentTarget).css({ left: touchLocation.pageX + "px", top: touchLocation.pageY + "px" })
    }
    };

    thirdTaskFn_TouchEnd_Ext = (selector, draggableItem) => {
        this.taskListCheckboxes.eq(2).addClass("checked");
        $('.dropBox').css({ position: "relative" })
        $(draggableItem).css({ left: "0.5rem", top: 0 })
        $(`.${selector}`).append(draggableItem)
    }

    thirdTaskFn_touchEnd = (e) => {
        const righDrop = $('.rightDrop')
        const leftDrop = $('.leftDrop')
        const draggableItem = $(e.currentTarget)

        const rightDrop_offset = righDrop.offset()
        const rightDrop_height = righDrop.outerHeight(true)
        const rightDrop_width = righDrop.outerWidth(true)
        const rightDrop_dFromTop = rightDrop_offset.top + rightDrop_height
        const rightDrop_dFromLeft = rightDrop_offset.left + rightDrop_width

        const leftDrop_offset = leftDrop.offset()
        const leftDrop_height = leftDrop.outerHeight(true)
        const leftDrop_width = leftDrop.outerWidth(true)
        const leftDrop_dFromTop = leftDrop_offset.top + leftDrop_height
        const leftDrop_dFromLeft = leftDrop_offset.left + leftDrop_width

        const draggableItem_offset = draggableItem.offset()

        let collideLeft = (leftDrop_dFromTop < draggableItem_offset.top || draggableItem_offset.top > leftDrop_dFromTop || leftDrop_dFromLeft < draggableItem_offset.left || draggableItem_offset.left > leftDrop_dFromLeft)

        let collideRight = (rightDrop_dFromTop < draggableItem_offset.top || draggableItem_offset.top > rightDrop_dFromTop || rightDrop_dFromLeft < draggableItem_offset.left || draggableItem_offset.left > rightDrop_dFromLeft)

        if(!collideLeft){
            this.thirdTaskFn("right")
            this.thirdTaskFn_TouchEnd_Ext('leftDrop', e.currentTarget)
            return
        }

        if(!collideRight){
            this.thirdTaskFn("left")
            this.thirdTaskFn_TouchEnd_Ext('rightDrop', e.currentTarget)
            return
        }

        if(collideRight && collideLeft){
            $('.dropBox').css({ position: "relative" })
            $(e.currentTarget).css({ left: "0.5rem", top: 0 })
        }
    }

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
                $("#fourthTaskResult").find('span').each(function(){
                    if($(this).text() === " "){
                        if($(this).attr("data-hasWidth") === undefined )
                            $(this).css({ width: ".9rem" }).attr('data-hasWidth', true)
                    }
                })
              },
            }
          );

          const valueLength = e.target.value.length
          const leftPostValue = $('.letterPointer').position().left
          const spanLast = $("#fourthTaskResult").find('span').eq(e.target.value.length - 1)

          $('.letterPointer').css({ left: (valueLength === 1 ? 44 : (leftPostValue + (spanLast.text() === " " ? 14 : spanLast.innerWidth()))) })
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

          const valueLength = e.target.value.length
          const leftPostValue = $('.letterPointer').position().left
          const spanLast = $("#fourthTaskResult").find('span').eq(e.target.value.length - 1)
  
          $('.letterPointer').css({ left: (valueLength === 1 ? 22 : (leftPostValue - (spanLast.text() === " " ? 14 : spanLast.innerWidth()))) })
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
      this.thirdTaskResult.find("p").css({ opacity: 1, right: "1.5rem" })
      $("#dragItem").on("dragstart", this.thirdTaskFn_Drag).on('touchmove', this.thirdTaskFn_Drag).on('touchend', this.thirdTaskFn_touchEnd)

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
