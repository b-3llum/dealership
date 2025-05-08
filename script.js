let carComponents = {
    models: [
        { id: "sedan", name: "Luxury Sedan", basePrice: 35000, image: "img/sedan.webp" },
        { id: "suv", name: "Premium SUV", basePrice: 45000, image: "img/suv.png" },
        { id: "sports", name: "Sports Car", basePrice: 55000, image: "img/sports.png" }
    ],
    colors: [
        { id: "orange", name: "orange", price: 800 },
        { id: "blue", name: "Blue", price: 600 },
        { id: "white", name: "white", price: 400 },
        { id: "grey", name: "grey", price: 500 }
    ],
    engines: [
        { id: "standard", name: "Standard (2.0L)", price: 0 },
        { id: "turbo", name: "Turbo (2.5L)", price: 3500 },
        { id: "performance", name: "Performance (3.0L)", price: 8000 }
    ],
    interiorOptions: [
        { id: "leather", name: "Leather Seats", price: 1800 },
        { id: "sunroof", name: "Panoramic Sunroof", price: 1500 },
        { id: "premium-audio", name: "Premium Audio", price: 1200 }
    ],
    wheels: [
        { id: "standard", name: "Standard (17\")", price: 0 },
        { id: "sport", name: "Sport (19\")", price: 1200 },
        { id: "premium", name: "Premium (21\")", price: 2500 }
    ]
};

document.addEventListener('DOMContentLoaded', function() {
    let customizerForm = document.getElementById('customizer-form');
    let modelSelect = document.getElementById('model');
    let engineSelect = document.getElementById('engine');
    let wheelsSelect = document.getElementById('wheels');
    let colorRadios = document.querySelectorAll('input[name="color"]');
    let interiorCheckboxes = document.querySelectorAll('input[name="interior"]');
    let resetButton = document.getElementById('reset-btn');
    
    let carImage = document.getElementById('car-image');
    let selectedOptionsDiv = document.getElementById('selected-options');
    let priceDisplay = document.getElementById('price-display');
    let priceDetails = document.getElementById('price-details');
    let totalPriceSpan = document.getElementById('total-price');
    
    modelSelect.addEventListener('change', updateCarPreview);
    engineSelect.addEventListener('change', updateSelectedOptions);
    wheelsSelect.addEventListener('change', updateSelectedOptions);
    
    colorRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            updateCarPreview();
            updateSelectedOptions();
        });
    });
    
    interiorCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateSelectedOptions);
    });
    
    customizerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            calculateAndDisplayPrice();
            priceDisplay.classList.remove('hidden');
            priceDisplay.classList.add('animate-fadeIn');
        }
    });
    
    resetButton.addEventListener('click', function() {
        customizerForm.reset();
        resetDisplay();
    });
    
    function updateCarPreview() {
        let selectedModel = modelSelect.value;
        let selectedColor = document.querySelector('input[name="color"]:checked')?.value;
        
        if (selectedModel) {
            let model = carComponents.models.find(m => m.id === selectedModel);
            if (model) {
                carImage.src = model.image;
                carImage.alt = model.name;
                
                carImage.style.filter = "none";
                
                if (selectedColor) {
                    switch(selectedColor) {
                        case 'orange':
                            carImage.style.filter = "sepia(0.5) saturate(5) hue-rotate(320deg)";
                            break;
                        case 'blue':
                            carImage.style.filter = "sepia(0.5) saturate(5) hue-rotate(180deg)";
                            break;
                        case 'white':
                            carImage.style.filter = "grayscale(0.8) brightness(1.2)";
                            break;
                        case 'grey':
                            carImage.style.filter = "brightness(0.7) contrast(1.2)";
                            break;
                    }
                }
            }
        } else {
            carImage.src = "img/default-car.jpg";
            carImage.alt = "Car Preview";
            carImage.style.filter = "none";
        }
        
        updateSelectedOptions();
    }
    
    function updateSelectedOptions() {
        let selectedModel = modelSelect.value;
        
        if (!selectedModel) {
            selectedOptionsDiv.innerHTML = "<p>Select a model to see preview</p>";
            return;
        }
        
        let selectedColor = document.querySelector('input[name="color"]:checked')?.value;
        let selectedEngine = engineSelect.value;
        let selectedWheels = wheelsSelect.value;
        let selectedInterior = Array.from(interiorCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);
        
        let optionsHTML = "<h4>Selected Options:</h4><ul>";
        
        let model = carComponents.models.find(m => m.id === selectedModel);
        if (model) {
            optionsHTML += `<li><strong>Model:</strong> ${model.name}</li>`;
        }
        
        let color = carComponents.colors.find(c => c.id === selectedColor);
        if (color) {
            optionsHTML += `<li><strong>Color:</strong> ${color.name}</li>`;
        }
        
        let engine = carComponents.engines.find(e => e.id === selectedEngine);
        if (engine) {
            optionsHTML += `<li><strong>Engine:</strong> ${engine.name}</li>`;
        }
        
        let wheels = carComponents.wheels.find(w => w.id === selectedWheels);
        if (wheels) {
            optionsHTML += `<li><strong>Wheels:</strong> ${wheels.name}</li>`;
        }
        
        if (selectedInterior.length > 0) {
            optionsHTML += "<li><strong>Interior Options:</strong> <ul>";
            selectedInterior.forEach(option => {
                let interiorOption = carComponents.interiorOptions.find(o => o.id === option);
                if (interiorOption) {
                    optionsHTML += `<li>${interiorOption.name}</li>`;
                }
            });
            optionsHTML += "</ul></li>";
        }
        
        optionsHTML += "</ul>";
        selectedOptionsDiv.innerHTML = optionsHTML;
    }
    
    function calculateTotalPrice() {
        let total = 0;
        
        let selectedModel = modelSelect.value;
        let model = carComponents.models.find(m => m.id === selectedModel);
        if (model) {
            total += model.basePrice;
        }
        
        let selectedColor = document.querySelector('input[name="color"]:checked')?.value;
        let color = carComponents.colors.find(c => c.id === selectedColor);
        if (color) {
            total += color.price;
        }
        
        let selectedEngine = engineSelect.value;
        let engine = carComponents.engines.find(e => e.id === selectedEngine);
        if (engine) {
            total += engine.price;
        }
        
        let selectedWheels = wheelsSelect.value;
        let wheels = carComponents.wheels.find(w => w.id === selectedWheels);
        if (wheels) {
            total += wheels.price;
        }
        
        let selectedInterior = Array.from(interiorCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);
            
        selectedInterior.forEach(option => {
            let interiorOption = carComponents.interiorOptions.find(o => o.id === option);
            if (interiorOption) {
                total += interiorOption.price;
            }
        });
        
        return total;
    }
    
    function calculateAndDisplayPrice() {
        let selectedModel = modelSelect.value;
        let model = carComponents.models.find(m => m.id === selectedModel);
        
        let selectedColor = document.querySelector('input[name="color"]:checked').value;
        let color = carComponents.colors.find(c => c.id === selectedColor);
        
        let selectedEngine = engineSelect.value;
        let engine = carComponents.engines.find(e => e.id === selectedEngine);
        
        let selectedWheels = wheelsSelect.value;
        let wheels = carComponents.wheels.find(w => w.id === selectedWheels);
        
        let selectedInterior = Array.from(interiorCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);
        
        let breakdownHTML = "";
        breakdownHTML += `<p><span>Base Price (${model.name}):</span> <span>$${model.basePrice.toLocaleString()}</span></p>`;
        breakdownHTML += `<p><span>Color (${color.name}):</span> <span>$${color.price.toLocaleString()}</span></p>`;
        breakdownHTML += `<p><span>Engine (${engine.name}):</span> <span>$${engine.price.toLocaleString()}</span></p>`;
        breakdownHTML += `<p><span>Wheels (${wheels.name}):</span> <span>$${wheels.price.toLocaleString()}</span></p>`;
        
        let interiorTotal = 0;
        if (selectedInterior.length > 0) {
            breakdownHTML += `<p><span>Interior Options:</span> <span></span></p>`;
            selectedInterior.forEach(option => {
                let interiorOption = carComponents.interiorOptions.find(o => o.id === option);
                if (interiorOption) {
                    breakdownHTML += `<p><span>- ${interiorOption.name}:</span> <span>$${interiorOption.price.toLocaleString()}</span></p>`;
                    interiorTotal += interiorOption.price;
                }
            });
        }
        
        let total = calculateTotalPrice();
        
        priceDetails.innerHTML = breakdownHTML;
        totalPriceSpan.textContent = `$${total.toLocaleString()}`;
    }
    
    function validateForm() {
        let isValid = true;
        
        if (!modelSelect.value) {
            alert("Please select a car model.");
            isValid = false;
        }
        
        let colorSelected = document.querySelector('input[name="color"]:checked');
        if (!colorSelected) {
            alert("Please select a color.");
            isValid = false;
        }
        
        if (!engineSelect.value) {
            alert("Please select an engine.");
            isValid = false;
        }
        
        if (!wheelsSelect.value) {
            alert("Please select wheels.");
            isValid = false;
        }
        
        let nameInput = document.getElementById('name');
        let emailInput = document.getElementById('email');
        
        if (!nameInput.value.trim()) {
            alert("Please enter your name.");
            isValid = false;
        }
        
        if (!emailInput.value.trim()) {
            alert("Please enter your email.");
            isValid = false;
        }
        
        return isValid;
    }
    
    function resetDisplay() {
        carImage.src = "img/default-car.jpg";
        carImage.alt = "Car Preview";
        carImage.style.filter = "none";
        
        selectedOptionsDiv.innerHTML = "<p>Select a model to see preview</p>";
        
        priceDisplay.classList.add('hidden');
        priceDetails.innerHTML = "";
        totalPriceSpan.textContent = "$0";
    }
    
    resetDisplay();
});