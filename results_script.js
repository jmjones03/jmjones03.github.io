
script.src = "https://code.jquery.com/jquery-3.6.0.min.js";


document.head.appendChild(script);


script.onload = function() {
    console.log("jQuery loaded successfully!");
    // You can now use jQuery functions
    $('body').append('<p>jQuery is working!</p>');
};

<canvas id="myChart" style="width:100%;max-width:700px"></canvas>
new Chart("myChart", {
    type: "doughnut",
    data: {
      labels: xValues,
      datasets: [{
        backgroundColor: barColors,
        data: yValues
      }]
    },
    options: {
      title: {
        display: true,
        text: "Results of Poll"
      }
    }
  });