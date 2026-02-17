//button Load
const categoryButton = () => {

    document.getElementById('bannerSection').classList.add('hidden');
    document.getElementById('WhyChooseUsSection').classList.add('hidden');


        document.getElementById('ourProductsSection').classList.remove('hidden');
        document.getElementById('allProductContainer').classList.remove('hidden');


    const url = ("https://fakestoreapi.com/products/categories")
    fetch(url)
    .then(res => res.json())
    .then(data => {
        displayButton(data)
        allProductLoad()
    })
} 

const showHomeSection = () => {
    document.getElementById('bannerSection').classList.remove('hidden');
    document.getElementById('WhyChooseUsSection').classList.remove('hidden');
    

    document.getElementById('ourProductsSection').classList.add('hidden');
    document.getElementById('allProductContainer').classList.add('hidden');
    document.getElementById('categoryProducts').classList.add('hidden');
    
};

//Display Button
const displayButton = (categoryBtns) =>{
    // console.log(categoryBtns)
    const ourProducts = document.getElementById("ourProducts")
    ourProducts.innerHTML = ""

    const allBtn = document.createElement("div")
  allBtn.innerHTML = `
    <button id = "allProduct" onclick = "allProductLoad()" class="  btn text-white rounded-2xl bg-blue-700">All</button>
  `
  ourProducts.append(allBtn)
 
    categoryBtns.forEach(categoryBtn => {
        // console.log(categoryBtn)
        const btnDiv = document.createElement("div")
        btnDiv.innerHTML = `
            <button id = "btn-${categoryBtn}" onclick = "loadCategory('${categoryBtn.replace(/'/g,"\\'")}')" class = "btn-category btn rounded-2xl  bg-white">${categoryBtn}</button>
        `
        ourProducts.append(btnDiv)
    })
}

// categoryButton()

//Load product

const allProductLoad = () => {
    const url = ("https://fakestoreapi.com/products")
    fetch(url)
    .then(res => res.json())
    .then(data => {
        displayAllProduct(data)
    })
}

const displayAllProduct = (allProducts) =>{
    const allProductContainer = document.getElementById("allProductContainer")
    allProductContainer.innerHTML = ""

    allProducts.forEach(allProduct =>{
        // console.log(allProduct)
        const productDiv = document.createElement("div")
        productDiv.innerHTML = `
            <div class="rounded-xl border border-gray-300">
                <div class = "bg-[#cfcfd4] rounded-t-xl">
                    <img class = "mx-auto h-64 object-contain"
                    src="${allProduct.image}"
                    alt="" />
                </div>
                <div class="card-body">
                    <ul class="md:flex justify-between items-center">
                        <li class="bg-blue-100 rounded-full px-2">${allProduct.category}</li>
                        <ul class="flex gap-1 items-center">
                            <i class="fa-solid fa-star text-orange-400"></i>
                            <li>${allProduct.rating.rate}
                            <li>(${allProduct.rating.count})</li>
                        </li>
                        </ul>
                    </ul>
                    <h2 class="card-title text-base font-medium truncate line-clamp-2">${allProduct.title}</h2>
                    <div class="font-bold text-lg">$${allProduct.price}</div>
                    <div class="flex justify-between">
                    <button onclick = "my_modal_5.showModal()" class="btn shadow-md bg-none rounded-lg"><i class="fa-regular fa-eye"></i> Details</button>
                    <button class="btn text-white bg-blue-700 rounded-lg"><i class="fa-solid fa-cart-shopping"></i>Add</button>
                    </div>
                </div>
                </div>
        `
        allProductContainer.append(productDiv)
    })
    
}


// Active remove
const removeActive = () =>{
    const removeActiveBtn = document.querySelectorAll(".btn-category")
    removeActiveBtn.forEach(btn => btn.classList.remove("active"))
} 



const loadCategory = (category) => {

    document.getElementById('allProductContainer').classList.add('hidden');
    document.getElementById('categoryProducts').classList.remove('hidden');


    const url = `https://fakestoreapi.com/products/category/${category}`
    fetch(url)
    .then(res => res.json())
    .then(data => {
        removeActive();
        const clickBtn = document.getElementById(`btn-${category}`)
        // console.log(clickBtn)
        clickBtn.classList.add("active");
        loadCategoryDisplay(data)
    })
}


const loadCategoryDisplay = (categoryProducts) => {
    // console.log(categoryProducts)
    const categoryProductSection = document.getElementById("categoryProducts")
    categoryProductSection.innerHTML = "" 

    categoryProducts.forEach(categoryProduct => {
        const categoryProductDiv = document.createElement("div")

        categoryProductDiv.innerHTML = `
            <div class="rounded-xl border border-gray-300">
                <div class = "bg-[#cfcfd4] rounded-t-xl">
                    <img class = "mx-auto h-64 object-contain""
                    src="${categoryProduct.image}"
                    alt="" />
                </div>
                <div class="card-body">
                    <ul class="flex justify-between items-center">
                        <li class="bg-blue-100 rounded-full px-2">${categoryProduct.category}</li>
                        <ul class="flex gap-1 items-center">
                            <i class="fa-solid fa-star text-orange-400"></i>
                            <li>${categoryProduct.rating.rate}
                            <li>(${categoryProduct.rating.count})</li>
                        </li>
                        </ul>
                    </ul>
                    <h2 class="text-lg font-medium truncate card-title">${categoryProduct.title}</h2>
                    <div class="font-bold text-lg">$${categoryProduct.price}</div>
                    <div class="flex justify-between">
                    <button onclick = "loadShowModal(${categoryProduct.id})" class="btn shadow-md bg-none rounded-lg"><i class="fa-regular fa-eye"></i> Details</button>
                    <button class="btn text-white bg-blue-700 rounded-lg"><i class="fa-solid fa-cart-shopping"></i>Add</button>
                    </div>
                </div>
                </div>
        `
        categoryProductSection.append(categoryProductDiv)
    })
}

// loadCategory()


const loadShowModal = async (id) => {
    const url = `https://fakestoreapi.com/products/${id}`
    // console.log(url)
    const res = await fetch(url);
    const details = await res.json();
    displayDetails(details);
}

const displayDetails = (ProductDetail) => {
    // console.log(ProductDetail)
    const detailsBox = document.getElementById("detailsContainer")
    detailsBox.innerHTML = `
        <div class="rounded-xl border border-gray-300">
                <div class = "bg-[#cfcfd4] rounded-t-xl">
                    <img class = "mx-auto h-64 object-contain""
                    src="${ProductDetail.image}"
                    alt="" />
                </div>
                <div class="card-body">
                    <ul class="flex justify-between items-center">
                        <li class="bg-blue-100 rounded-full px-2">${ProductDetail.category}</li>
                        <ul class="flex gap-1 items-center">
                            <i class="fa-solid fa-star text-orange-400"></i>
                            <li>${ProductDetail.rating.rate}
                            <li>(${ProductDetail.rating.count})</li>
                        </li>
                        </ul>
                    </ul>
                    <h2 class="text-lg font-medium card-title">${ProductDetail.title}</h2>
                    <p>${ProductDetail.description}</p>
                    <div class="font-bold text-lg">$${ProductDetail.price}</div>
                    <div class="flex justify-between">
                    </div>
                </div>
                </div>
    `
    document.getElementById("my_modal_5").showModal()

}