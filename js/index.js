// Define UI variables
const categoryContainer = document.getElementById('category-container');
const videoContainer = document.getElementById('videos-container');

const loadCategories = async ()=>{
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();
    const trimedData = data.data;

    // loop through all the categories and show them in the UI
    trimedData.forEach((category)=>{
        const categoryId = category.category_id;
        const div = document.createElement('div');
        div.innerHTML = `
        <button onclick="handleLoadVideos(${categoryId})" class="btn">${category.category}</button>
        `;
        categoryContainer.appendChild(div);

    })
}

// load Categoriee function
loadCategories();

// handle load videos function
const handleLoadVideos =(categoryId)=>{
    // fetch data from the api, videos
    const loadVideos = async()=>{
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await res.json();
    const trimedData = data.data;
    
    
    // clear the video container element
    videoContainer.innerHTML = '';
    // loop through all the videos in the array
        trimedData.forEach((video)=>{
        console.log(video);
        console.log(video.others.views);
        const div = document.createElement('div');
        div.className = 'card card-compact bg-base-100';
        div.innerHTML = `
        <figure><img class="h-[200px]" src=${video?.thumbnail} alt="" /></figure>
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
}

