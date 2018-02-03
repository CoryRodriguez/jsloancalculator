// Listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e) {
  // Hide Results
  document.getElementById('results').classList.add('d-none');
  // Show Loader 
  document.getElementById('loading').classList.remove('d-none');

  setTimeout(calculateResults, 500);

  e.preventDefault();
});

// Calculate Results Function
function calculateResults(){
  console.log('Calculating...');
  // UI Vars
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute Monthly Payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal*x*calculatedInterest)/(x-1);

  if(isFinite(monthly)){
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

    // Show Results
    document.getElementById('results').classList.remove('d-none');

    // Hide Loader
    document.getElementById('loading').classList.add('d-none');


  } else {
    showError('Please check your numbers')
  }
};


// Show Error Function
function showError(error) {
  // Hide Results
  document.getElementById('results').classList.add('d-none');

  // Hide Loader
  document.getElementById('loading').classList.add('d-none');

  // Create a div
  const errorDiv = document.createElement('div');

  // Get elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  // Add Class
  errorDiv.className = 'alert alert-danger';

  // Create Text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  // Insert Error Above Heading
  card.insertBefore(errorDiv, heading);

  // Clear error after 3 seconds
  setTimeout(clearError, 3000);
}

// Clear Error
function clearError() {
  document.querySelector('.alert').remove();
}