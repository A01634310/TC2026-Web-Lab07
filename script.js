const standButtons = ["diamond", "star", "DIO", "stand", "giorno"];

function updateButtonsDisplay() {
  $("#animal-buttons").empty();
  for (s of standButtons) {
    $("#animal-buttons").append(`
        <button class="search-button" data-sutando="${s}">${s}</button>
    `);
  }
}

$("body").on("click", ".search-button", async function () {
  const query = $(this).data("sutando");
  $(".search-button").removeClass("selected-button");
  $(this).addClass("selected-button");
  const standContent = await fetchStandContent(`JOJO ${query}`);
  updateStandDisplay(standContent);
});

$("body").on("click", "img", function () {
  const inMovement = $(this).data("inmovement");
  console.log(inMovement);
  $(this).attr(
    "src",
    inMovement ? $(this).data("still") : $(this).data("moving")
  );
  $(this).data("inmovement", !inMovement);
});

async function fetchStandContent(query) {
  const standContent = [];
  const response = await $.get("https://api.giphy.com/v1/gifs/search", {
    api_key: "WY2lfA9Z2DjvlBAXpU8YqfzaldoGS56m",
    q: query,
    limit: 10,
  });
  for (r of response.data) {
    standContent.push({
      img: r.images.fixed_height_still.url,
      gif: r.images.fixed_height.url,
      rating: r.rating,
    });
  }
  return standContent;
}

function updateStandDisplay(standContent) {
  $("#animals").empty();
  for (stand of standContent) {
    $("#animals").append(`
        <div class="animal-item">
            <p>Rating: ${stand.rating}</p>
            <img src="${stand.gif}"
                data-inMovement="true"
                data-moving="${stand.gif}"
                data-still="${stand.img}"
                alt=""
            />
        </div>
    `);
  }
}

$(document).ready(() => {
  updateButtonsDisplay();
});

$("#add-animal").on("click", async (e) => {
  e.preventDefault();
  const newStand = $("#animal-input").val();
  $("#animal-input").val("");
  standButtons.push(newStand);
  updateButtonsDisplay();
});
