let reactions = [
    {
        name : `Angry`,
        value : 'angry'
    },
    {
        name : `Confused`,
        value : 'confused'
    },
    {
        name : `Eh`,
        value : 'eh'
    },
    {
        name : `Okay`,
        value : 'ok'
    },
    {
        name : `Funny`,
        value : 'funny'
    },
    {
        name : `Love it`,
        value : 'love'
    }
];

let getReactionNameFromValue = (v) => {
    for(let i = 0; i < reactions.length; ++i) {
        if(reactions[i].value === v) return reactions[i].name;
    }
    return '';
}

let refreshMouthoffPage = () => {

    let mouthoffPage = $(".mouthoffPageCont");
    mouthoffPage.empty();

    let reactionsComp = [];

    reactions.map( (react) => {
        let checked = ``;
        if(react.value === 'eh') checked = ` checked `;
        reactionsComp.push(`
        <label class="reactionCont">
            <input type="radio" name="reaction" value="${react.value}" ${checked} />
            <div class="reactionIcon" style="background-image: url(res/imgs/reactions/${react.value}.svg);" ></div>
            <div class="reactionName">${react.name}</div>
        </label>
        `);
    });

    mouthoffPage.append(`
    <div class="mainWrap">
        <div class="mouthoffPageTitle">Leave your Feedback</div>
        <form class="mouthoffForm">
            <div class="formGroup">
                <div class="formInputTitle">Rate your Experience</div>
                <div class="formReactions noSelect">
                    ${reactionsComp.join("")}
                </div>
            </div>
            <div class="formGroup">
                <div class="formInputTitle">Leave us a message</div>
                <textarea class="mouthoffMessage" name="message"></textarea>
            </div>
            <div class="formGroup">
                <label class="checkboxWrap noSelect">
                    <input type="checkbox" name="subscribeEmail" />
                    <div class="fakeCheckbox"></div>
                    <div class="checkboxLabel">Subscribe to our Newsletter</div>
                </label>
            </div>
            <div class="formGroup hidden" id="emailField">
                <div class="formInputTitle">Your e-mail</div>
                <input type="text" name="email" />
            </div>
            <div class="formSubmit">
                <input class="btn black big" type="submit" value="Submit" />
            </div>
        </form>
    </div>
    `);

}

$(document).ready(function () {

    refreshMouthoffPage();

    $(document).on("change", `[name='subscribeEmail']`, function (e) {
        if(e.target.checked) {
            $("#emailField").removeClass("hidden");
        }else {
            $("#emailField").addClass("hidden");
        }
    });

    $(document).on("submit", ".mouthoffForm", function (e) {
        e.preventDefault();
        $(".formError").remove();
        let {reaction, message, subscribeEmail, email} = this;

        let canDo = true;

        if(!message.value.length) {
            canDo = false;
            $(message).parents(".formGroup").append(`<div class="formError">You must enter a message!</div>`);
        }

        if(subscribeEmail.checked && !email.value.length) {
            canDo = false;
            $(email).parents(".formGroup").append(`<div class="formError">You must enter an e-mail!</div>`);
        }

        if(canDo) {
            let emailComp = ``;
            if(subscribeEmail.checked) {
                emailComp = `
                <div class="mouthoffMessageEmail">
                You subscribed to our newsletter with the email ${email.value}
                </div>
                `;
            }

            $(document.body).addClass(`fixed`).append(`
            <div class="mouthoffShowMessageOverlay">
                <div class="mouthoffShowMessageCont">
                    <div class="mouthoffMessageReactionCont">
                        <div class="mouthoffMessageReaction" style="background-image: url(res/imgs/reactions/${reaction.value}.svg)"></div>
                        <div class="mouthoffMessageTitle">${getReactionNameFromValue(reaction.value)}</div>
                    </div>
                    <div class="mouthoffMessageContent">
                    ${message.value}
                    </div>
                    ${emailComp}
                </div>
            </div>
            `);

        }

    });

    $(document).on("click", function (e) {
        if($(".mouthoffShowMessageCont").length) {
            if(!$(e.target).closest('.mouthoffShowMessageCont').length) {
                e.preventDefault();
                $(".mouthoffShowMessageOverlay").remove();
                $("body").removeClass("fixed");
            }
        }
    });

});