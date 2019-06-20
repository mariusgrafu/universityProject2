let mainArticles = [
    {
        title : `ARENA WAR - COMING DECEMBER 11 TO GTA ONLINE`,
        content : `Enter Arena War, where ruthless gladiatorial combat meets the bleeding-edge of vehicular modification technology in one spectacular – and highly combustible – competition. Sign up and embark on an entirely new career under the stratospheric dome of the Maze Bank Arena, one that involves turning your opponent’s brains into pulp on the steering wheel in the name of entertainment, courtesy of Alan Jerome Productions.

        Compete in all new vehicle types custom built for the Arena across seven explosive new modes. As your Arena War career progresses, you’ll earn Arena Points and use them to rank up and unlock even more toys to take into the Arena or out onto the streets. 
        
        Arena War is coming tomorrow, Tuesday December 11 to GTA Online.`,
        postDate : new Date(`December 10, 2018`),
        cover : 'res/imgs/articles/arenaWars.jpg'
    },
    {
        title : `RED DEAD ONLINE BETA – WEEK 1 UPDATE`,
        content : `We want to thank the Red Dead community for playing and sending us tons of valuable feedback during the first full week of the Red Dead Online Beta’s availability. This feedback is crucial to help shape the game as we move forward.

        Today we are starting to implement the first set of adjustments to the game including changes specifically geared towards creating a more balanced, fun and rewarding overall experience, across all modes and missions. .`,
        postDate : new Date(`December 6, 2018`),
        cover : 'res/imgs/articles/week1.jpg'
    },
    {
        title : `EARN DOUBLE REWARDS IN GTA ONLINE: MOTOR WARS`,
        content : `The frenzied battle for survival in Motor Wars is twice as lucrative this week with Double GTA$ & RP payouts all the way through December 10th. Team up alongside a squad of equally ill-equipped reprobates and scramble for munitions and Weaponized Vehicles scattered across the battlefield as you seek to eliminate the mouth breathers on the opposing teams.
        Every king or queen needs a castle, so take advantage of 35% off all high-end Apartments and Stilt Houses this week as well as a slew of discounts on in-demand vehicles from San Andreas' top dealerships.
        Cruise the streets of Los Santos and turn a few heads with up to 35% off select high-performance vehicles, from the Coil Rocket Voltic to the Cheval Taipan.`,
        postDate : new Date(`December 4, 2018`),
        cover : 'res/imgs/articles/motorWars.png'
    }
];

mainArticles.sort( (a, b) => (a.postDate > b.postDate)?(-1):(0) );

let current = 0;

let getNextVideoIndex = (idx = current) => {
    if(idx + 1 >= featuredVideos.length) return 0;
    return idx + 1;
}

let getPrevVideoIndex = (idx = current) => {
    if(idx - 1 < 0) return featuredVideos.length - 1;
    return idx - 1;
}

let direction = 'in';

let featuredVideosInterval;

let refreshMainPageVideos = () => {
    let mainPageVideos = $(".mainPageVideos");
    mainPageVideos.empty();

    let animName = ` anim-${direction}-featuredVideo`;

    let prevIdx = getPrevVideoIndex();
    let prevVideo = featuredVideos[prevIdx];
    let prevVideoComp = `
    <div class="videoItemCont${animName}-sec" featuredVideoIndex = "${prevIdx}" direction="out" do="setCurrentFeaturedVideo">
    <div class="videoItemWrap">
        <div class="videoThumb" style="background-image: url(${prevVideo.thumbnail});"></div>
        <i class="rock-play"></i>
    </div>
    <div class="videoDetails">
        <div class="videoTitle">${prevVideo.title}</div>
        <div class="videoDate">${fullDate(prevVideo.postDate)}</div>
        <div class="videoDescription">${prevVideo.description}</div>
    </div>
    </div>
    `;

    let currentVideo = featuredVideos[current];
    let currentVideoComp = `
    <div class="videoItemCont${animName}" featuredVideoIndex = "${current}">
    <a href="videos.html?videoIndex=${currentVideo.index}">
    <div class="videoItemWrap">
        <div class="videoThumb" style="background-image: url(${currentVideo.thumbnail});"></div>
        <i class="rock-play"></i>
    </div>
    </a>
    <div class="videoDetails">
        <div class="videoTitle">${currentVideo.title}</div>
        <div class="videoDate">${fullDate(currentVideo.postDate)}</div>
        <div class="videoDescription">${currentVideo.description}</div>
    </div>
    </div>
    `;

    let nextIdx = getNextVideoIndex();
    let nextVideo = featuredVideos[nextIdx];
    let nextVideoComp = `
    <div class="videoItemCont${animName}-sec" featuredVideoIndex = "${nextIdx}" direction="in" do="setCurrentFeaturedVideo">
    <div class="videoItemWrap">
        <div class="videoThumb" style="background-image: url(${nextVideo.thumbnail});"></div>
        <i class="rock-play"></i>
    </div>
    <div class="videoDetails">
        <div class="videoTitle">${nextVideo.title}</div>
        <div class="videoDate">${fullDate(nextVideo.postDate)}</div>
        <div class="videoDescription">${nextVideo.description}</div>
    </div>
    </div>
    `;


    mainPageVideos.append(`
    <div class="mpvArea">
    ${prevVideoComp}
    ${currentVideoComp}
    ${nextVideoComp}
    </div>
    `);
}

let startInterval = () => {
    featuredVideosInterval = setInterval(() => {
        direction = "in";
        current = getNextVideoIndex();
        refreshMainPageVideos();
    }, 5000);
}

let refreshMainArticles = () => {
    let mainArticlesWrap = $(".mainPageArticles");
    mainArticlesWrap.empty();

    let articlesComp = [];

    mainArticles.map( (art) => {
        articlesComp.push(`
        <article>
            <div class="mpArticleCover" style="background-image: url(${art.cover});"></div>
            <div class="mpArticleText">
                <div class="mpArticleTitle">${art.title}</div>
                
                <div class="mpArticleDate">${fullDate(art.postDate)}</div>
                <div class="mpArticleContent">${art.content}</div>
            </div>
        </article>
        `);
    });

    mainArticlesWrap.append(`
    <div class="mainWrap">
    ${articlesComp.join("")}
    </div>
    `);
}

$(document).ready(function () {

    refreshMainPageVideos();

    refreshMainArticles();

    startInterval();

    $(document).on("click", `[do="setCurrentFeaturedVideo"]`, function () {
        let idx = parseInt($(this).attr("featuredVideoIndex"));
        direction = $(this).attr("direction");
        current = idx;
        refreshMainPageVideos();
        clearInterval(featuredVideosInterval);
        startInterval();
    });

    $(document).on("mouseenter", ".mainPageVideos", function () {
        clearInterval(featuredVideosInterval);
    });

    $(document).on("mouseleave", ".mainPageVideos", function () {
        startInterval();
    });


});