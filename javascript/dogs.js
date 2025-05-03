async function dogSlider() {
    const slider = document.getElementById("myslider");
    slider.innerHTML = ""; // Clear any previous images

    for (let i = 0; i < 10; i++) {
        const res = await fetch("https://dog.ceo/api/breeds/image/random");
        const data = await res.json();
        const img = document.createElement("img");
        img.src = data.message;
        slider.appendChild(img);
    }

    simpleslider.getSlider({
        container: slider,
        transitionTime: 1,
        delay: 3.5
    });
}

dogSlider();