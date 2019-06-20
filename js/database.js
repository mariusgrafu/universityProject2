let randomAvts = [
    'res/imgs/avts/avt1.jpg',
    'res/imgs/avts/avt2.jpg',
    'res/imgs/avts/avt3.jpg',
    'res/imgs/avts/avt4.jpg'
];


let videos = [
    {
        title : 'Red Dead Redemption II Launch Trailer',
        description : `Red Dead Redemption 2, an epic tale of life in America at the dawn of the modern age, arrives for PlayStation 4 and Xbox One on October 26th.`,
        thumbnail : 'res/imgs/videos/launchTrailer.jpg',
        src : 'https://videos.rockstargames.com/v3/reddeadredemption2-launchutl26-en_us-720p.mp4',
        postDate : new Date('18 Oct 2018'),
        featured : true
    },
    {
        title : 'GTA Online Arena War',
        description : `Enter Arena War, where ruthless gladiatorial combat meets the bleeding-edge of vehicular modification technology in one spectacular – and highly combustible – competition. Arena War is now available in GTA Online.`,
        thumbnail : 'res/imgs/videos/arenaWar.jpg',
        src : 'https://videos.rockstargames.com/v3/V-anera-en_us-720p.mp4',
        postDate : new Date('11 Dec 2018'),
        featured : true
    },
    {
        title : 'Red Dead Redemption II Official Gameplay Part 2',
        description : `Red Dead Redemption 2 is an epic tale of outlaw life that seamlessly blends story with action, and exploration with choice - all under the constant threat of danger. Coming October 26, 2018 to PlayStation 4 and Xbox One systems.`,
        thumbnail : 'res/imgs/videos/gameplay2.jpg',
        src : 'https://videos.rockstargames.com/v3/reddeadredemption2-rasgp2-en_us-720p.mp4',
        postDate : new Date('1 Oct 2018'),
        featured : true
    },
    {
        title : 'Red Dead Redemption II Official Gameplay Part 1',
        description : `Captured entirely from in-game footage, watch this introduction to Red Dead Redemption 2's gameplay in 4K. Red Dead Redemption 2 is coming October 26, 2018 to PlayStation 4 and Xbox One systems. Pre-order now.`,
        thumbnail : 'res/imgs/videos/gameplay1.jpg',
        src : 'https://videos.rockstargames.com/v3/reddeadredemption2-gp1tal-en_us-720p.mp4',
        postDate : new Date('9 Aug 2018'),
        featured : true
    },
    {
        title : 'GTA Online After Hours Update',
        description : `Partner with legendary impresario Tony Prince to open and operate a top shelf Nightclub featuring world-class DJ acts Solomun, Tale Of Us, Dixon and The Black Madonna, and use it as a front for the most concentrated network of criminal enterprise ever to hit San Andreas.`,
        thumbnail : 'res/imgs/videos/afterHours.jpg',
        src : 'https://videos.rockstargames.com/v3/V-afterhours-en_us-720p.mp4',
        postDate : new Date('19 July 2018'),
        featured : false
    },
    {
        title : 'LA Noire',
        description : `The story of detective Cole Phelps' rise through the LAPD ranks as he investigates a string of crimes in 1947 Los Angeles, L.A. Noire for the PlayStation 4, Xbox One, and Nintendo Switch will be available on November 14th, along with L.A. Noire: The VR Case Files for HTC Vive, which features seven select cases rebuilt for VR.`,
        thumbnail : 'res/imgs/videos/laNoire.jpg',
        src : 'https://videos.rockstargames.com/v3/lanoire-4k-en_us-720p.mp4',
        postDate : new Date('26 Oct 2017'),
        featured : false
    }
];

videos.sort( (a, b) => (a.postDate > b.postDate)?(-1):(0) );

videos.map( (video, i) => {
    video.index = i;
});

let games = [
    {
        title : "Red Dead Redemption II",
        site : `https://www.rockstargames.com/reddeadredemption2`,
        cover : 'res/imgs/games/reddeadredemption2.jpg',
        price : 59.99,
        featured : true
    },
    {
        title : "Grand Theft Auto V",
        site : `http://www.rockstargames.com/V/`,
        cover : 'res/imgs/games/V.jpg',
        price : 29.99,
        featured : true
    },
    {
        title : "LA Noire",
        site : `http://www.rockstargames.com/lanoire/`,
        cover : 'res/imgs/games/lanoire.jpg',
        price : 29.99,
        featured : true
    },
    {
        title : "Max Payne 3",
        site : `http://www.rockstargames.com/maxpayne3`,
        cover : 'res/imgs/games/maxpayne3.jpg',
        price : 19.99,
        featured : true
    },
    {
        title : "Red Dead Redemption",
        site : `http://www.rockstargames.com/reddeadredemption/`,
        cover : 'res/imgs/games/reddeadredemption.jpg',
        price : 19.99,
        featured : true
    },
    {
        title : "Bully",
        site : `http://www.rockstargames.com/bully/`,
        cover : 'res/imgs/games/bully.jpg',
        price : 9.99,
        featured : false
    },
    {
        title : "GTA IV: Episodes From Liberty City",
        site : `http://www.rockstargames.com/episodesfromlibertycity`,
        cover : 'res/imgs/games/episodesfromlibertycity.jpg',
        price : 14.99,
        featured : false
    },
    {
        title : "Midnight Club: Los Angeles",
        site : `http://www.rockstargames.com/midnightclubLA`,
        cover : 'res/imgs/games/midnightclubLA.jpg',
        price : 14.99,
        featured : false
    },
    {
        title : "Grand Theft Auto IV",
        site : `http://www.rockstargames.com/IV/`,
        cover : 'res/imgs/games/IV.jpg',
        price : 19.99,
        featured : false
    },
    {
        title : "Grand Theft Auto: San Andreas",
        site : `http://www.rockstargames.com/sanandreas/`,
        cover : 'res/imgs/games/sanandreas.jpg',
        price : 9.99,
        featured : false
    },
    {
        title : "Max Payne 2",
        site : `http://www.rockstargames.com/maxpayne2/`,
        cover : 'res/imgs/games/maxpayne2.jpg',
        price : 9.99,
        featured : false
    },
    {
        title : "Grand Theft Auto: Vice City",
        site : `http://www.rockstargames.com/vicecity/`,
        cover : 'res/imgs/games/vicecity.jpg',
        price : 9.99,
        featured : false
    },
    {
        title : "Grand Theft Auto III",
        site : `http://www.rockstargames.com/grandtheftauto3/`,
        cover : 'res/imgs/games/grandtheftauto3.jpg',
        price : 9.99,
        featured : false
    },
    {
        title : "Max Payne",
        site : `http://www.rockstargames.com/maxpayne/main.html`,
        cover : 'res/imgs/games/maxpayne.jpg',
        price : 9.99,
        featured : false
    },
    {
        title : "Grand Theft Auto",
        site : `http://www.rockstargames.com/gta`,
        cover : 'res/imgs/games/gta.jpg',
        price : 0.99,
        featured : false
    }
];

let getFeaturedVideos = () => {
    let arr = [];
    videos.map( (video) => {
        if(video.featured) arr.push(video);
    });
    return arr;
}

let featuredVideos = getFeaturedVideos();

let getFeaturedGames = () => {
    let arr = [];
    games.map( (game) => {
        if(game.featured) arr.push(game);
    });
    return arr;
}

let featuredGames = getFeaturedGames();

let navLinks = [
    {
        title : `Home`,
        url : `index.html`,
        pageKey : 'homepage'
    },
    {
        title : `Games`,
        url : `games.html`,
        pageKey : 'gamespage'
    },
    {
        title : `Videos`,
        url : `videos.html`,
        pageKey : 'videospage'
    },
    {
        title : `Mouthoff`,
        url : `mouthoff.html`,
        pageKey : 'mouthoffpage'
    }
];

let socialLinks = [
    {
        title : 'facebook',
        url : 'http://www.facebook.com/rockstargames',
        icon : 'facebook-squared',
    },
    {
        title : 'twitter',
        url : 'http://twitter.com/RockstarGames',
        icon : 'twitter',
    },
    {
        title : 'youtube',
        url : 'http://youtube.com/rockstargames',
        icon : 'youtube-play',
    },
    {
        title : 'instagram',
        url : 'http://instagram.com/rockstargames',
        icon : 'instagram',
    },
    {
        title : 'twitch',
        url : 'http://twitch.tv/rockstargames',
        icon : 'twitch',
    }

];