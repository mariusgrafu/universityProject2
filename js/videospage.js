let refreshVideoPage = () => {
    let videoPage = $(".videoPageCont");
    videoPage.empty();

    const urlParams = new URLSearchParams(window.location.search);

    let mainVideoIdx = urlParams.get('videoIndex') || 0;
    let mainVideo = videos[mainVideoIdx];

    let videosList = [];

    videos.map( (video) => {
        videosList.push(`
        <a href="videos.html?videoIndex=${video.index}">
        <div class="videoItem">
            <div class="videoItemThumb" style="background-image: url(${video.thumbnail});">
                <i class="rock-play"></i>
            </div>
            <div class="videoItemTitle">${video.title}</div>
        </div>
        </a>
        `);
    });

    videoPage.append(`
    <div class="mainWrap">
    <div class="mainVideoWrap">
        <div class="mainVideo">
            <video controls autoplay>
                <source src='${mainVideo.src}' type='video/mp4'>
            </video>
        </div>
        <div class="mainVideoTitle">${mainVideo.title}</div>
        <div class="mainVideoDate">${fullDate(mainVideo.postDate)}</div>
        <div class="mainVideoDescription">${mainVideo.description}</div>
    </div>
    <div class="videosList">
        ${videosList.join("")}
    </div>
    </div>
    `);
}

$(document).ready(function () {
    refreshVideoPage();
});