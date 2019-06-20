let refreshGamesCont = () => {
    let gamesCont = $(".gamesCont");
    gamesCont.empty();

    gamesComp = [];

    games.map( (game, i) => {
        gamesComp.push(`
        <div class="gameItemCont" draggable="true" game-index="${i}">
        <div class="gameCoverCont">
            <div class="gameCover" style="background-image: url(${game.cover});"></div>
        </div>
        <div class="gameTitle">${game.title}</div>
        <div class="gameBuy">
            <div class="gamePrice">$${game.price}</div>
            <div class="gameBuyBtn noSelect">Buy Game</div>
        </div>
        </div>
        `);
    });


    gamesCont.append(`
    <div class="mainWrap">
    ${gamesComp.join("")}
    </div>
    `);
}

let draggedGame = null;

$(document).ready(function () {

    refreshGamesCont();

    $(document).on("mousemove", ".gameItemCont", function (e) {
        let top = e.pageY - $(this).offset().top;
        let left = e.pageX - $(this).offset().left;

        let rotateX = left - $(this).innerWidth()/2;
        let rotateY = $(this).innerHeight()/2 - top;

        rotateX /= 10;
        rotateY /= 15;

        $(this).find(`.gameCover`).css({
            transform: `rotateY(${rotateX}deg) rotateX(${rotateY}deg)`
        });

    });

    $(document).on("mouseleave", ".gameItemCont", function () {
        $(this).find(`.gameCover`).css({
            transform: `none`
        })
    });

    $(document).on("click", ".gameBuyBtn", function () {
        let gameIdx = parseInt($(this).parents(".gameItemCont").attr("game-index"));
        user.buyGame(gameIdx);
    });

    $(document).on("dragstart", ".gameItemCont", function (e) {
        draggedGame = parseInt($(this).attr("game-index"));
        $(".gameDragPreview").remove();
    });

    $(document).on("dragover", ".shopPanel", function (e) {
        e.preventDefault();
    });

    $(document).on("drop", ".shopPanel", function (e) {
        e.preventDefault();
        if(draggedGame !== null) user.buyGame(draggedGame);
        draggedGame = null;
    });

});