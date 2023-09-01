// Define UI variables
const categoryContainer = document.getElementById('category-container');
const videoContainer = document.getElementById('videos-container');
const noDataAvailable = document.getElementById('no-data-available-div');
const loadingSpinner = document.getElementById('loading-spinner');

// toggle loading spinner
const toggleLoadingSpinner = (isLoading)=>{
   
    if(isLoading){
        loadingSpinner.classList.remove('hidden')
    } else{
        loadingSpinner.classList.add('hidden');
    }
}


// load categories
const loadCategories = async ()=>{
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();
    const trimedData = data.data;

    // loop through all the categories and show them in the UI
    trimedData.forEach((category)=>{
        const categoryId = category.category_id;
        const div = document.createElement('div');
        div.innerHTML = `
        <button onclick="handleLoadVideos(${categoryId})" class="btn category-btn">${category.category}</button>
        `;
        categoryContainer.appendChild(div);
    });
    // make the category buttons active when clicked
    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach((button)=>{
       button.addEventListener('click', ()=>{
            document.querySelector('.active')?.classList.remove('active');
            button.classList.add('active');
       });
    });  
};
// load Categories function
loadCategories();


// handle load videos function
const handleLoadVideos =(categoryId)=>{ 
    // fetch data from the api, videos
    const loadVideos = async()=>{
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    // console.log(categoryId);
    const data = await res.json();
    const trimedData = data.data;
   
    // clear the video container element
    videoContainer.innerHTML = '';
    
    if(trimedData.length === 0) {
       noDataAvailable.innerHTML = `
       <div><img src="./images/Icon.png"></div>
       <h2 class="text-2xl font-bold text-center">Oops!! Sorry, There is no<br> content here</h2>
       `;
       noDataAvailable.classList.remove('hidden');
       return noDataAvailable;
    } else {
        noDataAvailable.classList.add('hidden')
    }
    
    // loop through all the videos in the array
        trimedData.forEach((video)=>{
        
        const seconds = parseInt(video?.others?.posted_date);
        
        const div = document.createElement('div');
        div.className = 'card-compact bg-base-100';
        div.innerHTML = `
        <figure><img class="h-[200px] w-full mx-auto md:w-[300px] rounded-lg" src=${video?.thumbnail} alt="" /></figure>
        <div class="absolute bg-black opacity-70 text-white text-xs p-1 -mt-8 ml-52 md:-mt-8 md:ml-44">
           <p>${isNaN(seconds) ? '' : (JSON.stringify(Math.floor(seconds/3600)).concat('hrs'))} <span>${isNaN(seconds) ? '' : (JSON.stringify(Math.floor((seconds/60)%60)).concat(' ', 'min ago'))}</span</p>
        </div>
        <div class="mt-4">
            <div class="flex items-start gap-2">
                <div>
                    <img class="w-9 rounded-full" src=${video?.authors[0]?.profile_picture} />
                </div>
                <div>
                    <h3 class="text-lg font-bold">${video?.title}</h3>
                    <div class="flex items-center gap-2">
                        <p class="text-gray-500">${video?.authors[0]?.profile_name}</p>
                        <span>${video?.authors[0]?.verified ? '<i class="far fa-check-circle text-blue-600"></i>' : ''}</span>
                    </div>
                    <p class="text-gray-500">${video?.others?.views}</p>
                </div>
            </div>
        </div>
        `;

        videoContainer.appendChild(div);
        });
       
    };
    // call the load videos function
    loadVideos();
};

const loadAllVideos = async()=>{
    // loading spinner
    toggleLoadingSpinner(true)
    const res = await fetch('https://openapi.programming-hero.com/api/videos/category/1000');
    // console.log(categoryId);
    const data = await res.json();
    const trimedData = data.data;
    
    // clear the video container element
    videoContainer.innerHTML = '';
    
    if(trimedData.length === 0) {
       noDataAvailable.innerHTML = `
       <div><img src="./images/Icon.png"></div>
       <h2 class="text-2xl font-bold text-center">Oops!! Sorry, There is no<br> content here</h2>
       `;
       noDataAvailable.classList.remove('hidden');
       return noDataAvailable;
    } else {
        noDataAvailable.classList.add('hidden')
    }
    
    // loop through all the videos in the array
    trimedData.forEach((video)=>{
    // console.log(video);
    // console.log(typeof video.others.posted_date);
    const seconds = parseInt(video?.others?.posted_date);
    // console.log(seconds);
    const div = document.createElement('div');
    div.className = 'card-compact bg-base-100';
    div.innerHTML = `
    <figure><img class="h-[200px] w-full mx-auto md:w-[300px] rounded-lg" src=${video?.thumbnail} alt="" /></figure>
    <div class="absolute bg-black opacity-70 text-white text-xs p-1 -mt-8 ml-52 md:-mt-8 md:ml-44">
        <p>${isNaN(seconds) ? '' : (JSON.stringify(Math.floor(seconds/3600)).concat('hrs'))} <span>${isNaN(seconds) ? '' : (JSON.stringify(Math.floor((seconds/60)%60)).concat(' ', 'min ago'))}</span</p>
    </div>
    <div class="mt-4">
        <div class="flex items-start gap-2">
            <div>
                <img class="w-9 rounded-full" src=${video?.authors[0]?.profile_picture} />
            </div>
            <div>
                <h3 class="text-lg font-bold">${video?.title}</h3>
                <div class="flex items-center gap-2">
                    <p class="text-gray-500">${video?.authors[0]?.profile_name}</p>
                    <span>${video?.authors[0]?.verified ? '<i class="far fa-check-circle text-blue-600"></i>' : ''}</span>
                </div>
                <p class="text-gray-500">${video?.others?.views}</p>
            </div>
        </div>
    </div>
    `;
    videoContainer.appendChild(div);
    });
    toggleLoadingSpinner(false);
};

loadAllVideos();

// blog btn function
const handleBlogBtn = ()=>{
    window.location.href = 'blog.html'
};

// sort btn function
const handleSortBtn = async()=>{
    toggleLoadingSpinner(true);
    const res = await fetch('https://openapi.programming-hero.com/api/videos/category/1000');
    let data = await res.json();
    data = data.data;
    // console.log(data[0].others.views);
    const customSort = (a,b)=>{
        const viewA = parseInt(a.others.views);
        const viewB = parseInt(b.others.views);
        if(viewA < viewB) return 1;
        else if(viewA > viewB) return -1;
        return 0;
    };
    const trimedData = data.sort(customSort);

    // clear the video container element
    videoContainer.innerHTML = '';
    
    if(trimedData.length === 0) {
       noDataAvailable.innerHTML = `
       <div><img src="./images/Icon.png"></div>
       <h2 class="text-2xl font-bold text-center">Oops!! Sorry, There is no<br> content here</h2>
       `;
       noDataAvailable.classList.remove('hidden');
       return noDataAvailable;
    } else {
        noDataAvailable.classList.add('hidden')
    }

    // loop through all the videos in the array
    trimedData.forEach((video)=>{
    const seconds = parseInt(video?.others?.posted_date);
    // console.log(seconds);
    const div = document.createElement('div');
    div.className = 'card-compact bg-base-100';
    div.innerHTML = `
    <figure><img class="h-[200px] w-full md:w-[300px] rounded-lg" src=${video?.thumbnail} alt="" /></figure>
    <div class="absolute bg-black opacity-70 text-white text-xs p-1 -mt-8 ml-52 md:-mt-8 md:ml-44">
        <p>${isNaN(seconds) ? '' : (JSON.stringify(Math.floor(seconds/3600)).concat('hrs'))} <span>${isNaN(seconds) ? '' : (JSON.stringify(Math.floor((seconds/60)%60)).concat(' ', 'min ago'))}</span</p>
    </div>
    <div class="mt-4">
        <div class="flex items-start gap-2">
            <div>
                <img class="w-9 rounded-full" src=${video?.authors[0]?.profile_picture} />
            </div>
            <div>
                <h3 class="text-lg font-bold">${video?.title}</h3>
                <div class="flex items-center gap-2">
                    <p class="text-gray-500">${video?.authors[0]?.profile_name}</p>
                    <span>${video?.authors[0]?.verified ? '<i class="far fa-check-circle text-blue-600"></i>' : ''}</span>
                </div>
                <p class="text-gray-500">${video?.others?.views}</p>
            </div>
        </div>
    </div>
    `;

    videoContainer.appendChild(div);
    });
    toggleLoadingSpinner(false);
};

