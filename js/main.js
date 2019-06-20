class User {

    constructor () {
        if(localStorage.name !== undefined) {
            this.name = localStorage.name;
            this.isLogged = true;
        }else {
            this.name = `Guest`;
            this.isLogged = false;
        }
        try{
            this.store = JSON.parse(localStorage.store);
        }catch(e) {
            this.store = [];
        }
        this.avatar = randomAvts[ Math.floor(Math.random() * randomAvts.length) ];
    }

    login(name) {
        localStorage.setItem("name", name);
        this.name = name;
        this.isLogged = true;
        renderHeader();
    }

    logout() {
        localStorage.removeItem("name");
        localStorage.removeItem("store");
        this.name = "Guest";
        this.isLogged = false;
        this.store = [];
        renderHeader();
    }

    buyGame(gameIdx) {
        this.store.push(gameIdx);
        localStorage.store = JSON.stringify(this.store);
        renderHeader();
    }

    removeGame(gameIdx, update = true) {
        let found = this.store.indexOf(gameIdx);
        if(found < 0) return;
        this.store.splice(found, 1);
        localStorage.store = JSON.stringify(this.store);
        if(update) renderHeader();
    }

    buyGames() {
        this.store = [];
        localStorage.store = JSON.stringify(this.store);
        renderHeader();
    }

}

fullDate = (d) => {
    let re = "";
    let D = new Date(d);
    let options = { month: 'long', day: 'numeric', year : 'numeric'};
    re = D.toLocaleDateString('en-US', options);
    return re;
}

let user;
let page;

let loginPage;

let snapMenuBar = (elem) => {
    let padding = parseFloat(elem.css('padding-left'));
    let width = elem.width();
    let left = elem.position().left + padding;

    $(".selectedMenuBar").css({width, left});
}


let renderHeader = () => {
    if(page == 'loginpage') return;
    let header = $("header");
    header.empty();
    let logo = `
    <div class="mainLogoWrap">
    <a href="index.html" class="mainLogo"></a>
    </div>
    `;

    let navLinksComps = [];
    navLinks.map( (link) => {
        let active = ``;
        if(link.pageKey == page) active = ` active`;
        navLinksComps.push(`
        <a href="${link.url}" class="menuItem${active}" data-page="${link.pageKey}">
        ${link.title}
        </a>
        `);
    });

    let navHoverGames = [];

    featuredGames.map( (game) => {
        navHoverGames.push(`
        <a class="navHoverGame" href="${game.site}" target="_blank">
            <div class="navHoverGameCover" style="background-image: url(${game.cover});"></div>
            <div class="navHoverGameTitle">${game.title}</div>
        </a>
        `);
    });

    let nav = `
    <nav>
    ${navLinksComps.join("")}
    <div class="selectedMenuBar"></div>
    </nav>
    `;

    let userPanel = ``;
    let mobileMenuTogg = `
    <i class="rock-menu mobileMenuTogg"></i>
    `;

    if(!user.isLogged) {
        userPanel = `
        <div class="userPanel">
        ${mobileMenuTogg}
        <div class="btn black" do="login">
            Sign in
        </div>
        </div>
        `;
    }else {
        let shopCounter = ``;
        let hasStore = ``;
        if(user.store.length) {
            shopCounter = `<span class="shopPanelCounter">${user.store.length}</span>`;
            hasStore = ` do="toggleStore" `;
        }
        userPanel = `
        <div class="userPanel" >
        ${mobileMenuTogg}
        <div class="shopPanel"${hasStore}>
            <div class="shopPanelIconWrap">
                ${shopCounter}
                <i class="rock-shop"></i>
            </div>
        </div>

        <div class="userWrap">
            <div class="userAvatar" style="background-image: url(${user.avatar});"></div>
            <div class="userMenuWrap">
                <div class="userMenuTitle">${user.name}</div>
                <a class="userMenuItem" target="_blank" href="https://socialclub.rockstargames.com/">SocialClub</a>
                <div class="btn" do="logout">Log out</div>
            </div>
        </div>
        </div>
        `;
    }

    header.append(`
    <div class="mainWrap" headerWrap>
    ${logo}
    ${nav}
    ${userPanel}
    </div>
    
    <div class="navHoverGames"><div class="mainWrap">${navHoverGames.join("")}</div></div>
    `);

    snapMenuBar( $(`.menuItem.active`));
}

let refreshFooter = () => {
    let footer = $("footer");
    footer.empty();

    footerLinks = [];

    navLinks.map( (navLink) => {
        footerLinks.push(`
        <a href="${navLink.url}" class="footerLink">${navLink.title}</a>
        `);
    });

    socialLinksComp = [];
    socialLinks.map( (socialLink) => {
        socialLinksComp.push(`
        <a href="${socialLink.url}" target="_blank"><i class="rock-${socialLink.icon}"></i></a>
        `);
    });

    footer.append(`
        <div class="mainWrap">
            <div class="footerLinks">
                ${footerLinks.join("")}
            </div>

            <div class="footerSocialLinks">
                ${socialLinksComp.join("")}
            </div>

            <div class="footerLogo">
                <i class="rock-logo-outline"></i>
            </div>

            <div class="footerCopyright">
                <div class="footerCr">Copyright Rockstar Games 2019</div>
                <div class="footerMotto">MAKING GLIB COMMENTS AND BAD JOKES SINCE 1998</div>
            </div>
        </div>
    `);
}

$(document).ready(function () {

    user = new User();

    page = $("body").attr("data-page") || 'homepage';
    
    $(document).on("mouseenter", ".menuItem", function () {
        snapMenuBar( $(this) );
    });
    
    $(document).on("mouseleave", ".menuItem", function () {
        snapMenuBar( $(`.menuItem.active`));
    });

    $(document).on("click", `[do="login"]`, function () {
        loginPage = window.open("", "login page", "toolbar=no,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400");

        let newDoc = loginPage.document;
        $(newDoc).ready(function(){
            $(newDoc).find("head").append(`
            <link rel="stylesheet" href="${window.location.href.substring(0, window.location.href.lastIndexOf('/'))}/style/style.css" >
            `);
            let newBody = $(newDoc).find('body');
            newBody.attr("data-page", "loginpage");
            newBody.append(`
            <form class="loginForm" id="loginForm">
                <div class="loginFormInputGroup">
                    <label>Username</label>
                    <input type="text" name="name" />
                </div>
                <div class="loginFormInputGroup">
                    <label>Password</label>
                    <input type="password" name="password" />
                </div>

                <div class="loginFormInputGroup">
                    <input type="submit" value="Login" />
                </div>
            </form>
            `);

            $(newDoc).on("submit", "#loginForm", function (e) {
                e.preventDefault();
                let name = this.name.value;
                let pass = this.password.value;
                if(name.length && pass.length) {
                    user.login(name);
                    loginPage.close();
                }
            });
        });
        
    });

    $(document).on("click", "[do=logout]", function () {
        user.logout();
    });

    $(document).on("scroll", function (e) {
        let scrollTop = $(this).scrollTop();

        if(scrollTop > 0) {
            $("header").addClass("compact");
        }else {
            $("header").removeClass("compact");
        }
    });

    let navHoverGamesTimeout;

    $(document).on("mouseenter", "nav .menuItem[data-page='gamespage'], header .navHoverGames .mainWrap", function () {
        clearTimeout(navHoverGamesTimeout);
        $(".navHoverGames").addClass("active");
    });

    $(document).on("mouseleave", "nav .menuItem[data-page='gamespage'], header .navHoverGames .mainWrap", function () {
        navHoverGamesTimeout = setTimeout( () => {
            $(".navHoverGames").removeClass("active");
        }, 100);
    });

    $(document).on("click", `[do="toggleStore"]`, function () {
        if($(".storeModalCont").length) {
            $(".storeModalCont").remove();
            return;
        }
        if(!user.store.length) return;
        let header = $("header");

        let storeModal = ``;
        let storeItems = [];

        let totalSum = 0;

        if(user.store.length) {
            user.store.map( (item) => {
                totalSum += parseFloat(games[item].price);
                storeItems.push(`
                <div class="storeItem noSelect" game-index="${item}">
                    <div class="storeItemThumb" style="background-image: url(${games[item].cover});"></div>
                    <div class="storeItemTitle">
                        <span>${games[item].title}</span>
                        <div class="storePrice">$${games[item].price}</div>
                    </div>
                    <div class="rock-close" do="removeGame"></div>
                </div>
                `);
            });
        }

        storeModal = `
        <div class="storeModalCont">
            <div class="storeModalContTitle">Your Cart</div>
            <div class="storeItems">
            ${storeItems.join("")}
            </div>
            <div class="storeTotal">
                <div class="storeTotalLabel">Total</div>
                <div class="storeTotalSum">$<span>${totalSum.toFixed(2)}</span></div>
            </div>
            <div class="storeBuy">
                <div class="btn orange" do="buyGames">Buy</div>
            </div>
        </div>
        `;

        header.find(".mainWrap[headerWrap]").append(storeModal);
    });

    $(document).on("click", `[do="removeGame"]`, function () {
        let gameIdx = parseInt( $(this).parents(".storeItem").attr("game-index") );
        user.removeGame(gameIdx, false);
        if(!user.store.length) {
            $(".shopPanelCounter").remove();
            $(".storeModalCont").remove();
            return;
        }else {
            $(".shopPanelCounter").text(user.store.length);
        }
        let totalSum = parseFloat( $(".storeTotalSum span").text() );
        totalSum = Math.max(0, (totalSum - games[gameIdx].price).toFixed(2));
        if(!totalSum) {
            $(".storeModalCont").remove();
            return;
        }
        $(".storeTotalSum span").text(totalSum);

        $(this).parents(".storeItem").remove();
    });

    $(document).on("click", `[do="buyGames"]`, function () {
        user.buyGames();
    });

    $(document.body).on("click", function (e) {
        if($(".storeModalCont").length) {
            if(!$(e.target).closest('.storeModalCont').length) {
                e.preventDefault();
                $(".storeModalCont").remove();
            }
        }
    });

    $(document).on("click", ".mobileMenuTogg", function () {
        let mobileMenuItems = [];
        navLinks.map( (navLink) => {
            mobileMenuItems.push(`
            <a class="mobileMenuItem" href="${navLink.url}">${navLink.title}</a>
            `);
        });
        $("body").addClass('fixed').append(`
        <div class="mobileMenuCont">
            <div class="mobileMenuItems">
            ${mobileMenuItems.join("")}
            <div class="mobileMenuItem" do="closeMobileMenu">Close</div>
            </div>
        </div>
        `);
    });

    $(document).on("click", `[do="closeMobileMenu"]`, function () {
        $("body").removeClass("fixed");
        $(".mobileMenuCont").remove();
    });

    $(window).on("resize", function() {
        if($(window).innerWidth() > 1000) {
            $("body").removeClass("fixed");
            $(".mobileMenuCont").remove();
        }
    });

    renderHeader();

    refreshFooter();

});