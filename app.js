document.getElementById('loan-form').addEventListener('submit', function(e) {

  //Hide results
  document.getElementById('results').style.display = 'none';

  //Show loader
  document.getElementById('loading').style.display = 'block';

  setTimeout(calculateResults, 2000)


  e.preventDefault();
});

function calculateResults() {
    const amount = document.getElementById('amount');
    const Interest = document.getElementById('interest');
    const years = document.getElementById('years');

    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    //Actual Calculation
    
  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal*x*calculatedInterest)/(x-1);

  //Before returning monthly value, need to do a check if its an actual number.
  if(isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);

  //Show results
  document.getElementById('results').style.display = 'block';

  //Hide loader
  document.getElementById('loading').style.display = 'none';
  } else {
      showError('Check your numbers again')
  }
}

function showError(error) {

    //Hide results
    document.getElementById('results').style.display = 'none';
    //Hide loader
    document.getElementById('loading').style.display = 'none';

    const errorDiv = document.createElement('div');

    errorDiv.className = 'alert alert-danger';

    errorDiv.appendChild(document.createTextNode(error));

    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    card.insertBefore(errorDiv, heading);

    setTimeout(clearError, 3000);
}

function clearError() {
    document.querySelector('.alert').remove();
}