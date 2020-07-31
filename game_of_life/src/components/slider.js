const slider = document.getElementById("myRange");
const output = document.getElementById("value");

output.innerHTML = slider.value;
slider.oninput = function () {
    output.innerHTML = this.value;
};
slider.addEventListener("mousemove", function () {
    const x = slider.value;
    const color =
        "linear-gradient(90deg, rgb(117, 252, 117)" +
        x +
        "%, rgb(214, 214, 214)" +
        x +
        "%)";
    slider.style.background = color;
    console.log(color);
});
