var isValidate, formatedValue;
function validateField() {
    isValidate = !0;
    document.querySelectorAll(".showContent .commen-error").forEach(function (e) {
        e.classList.contains("show-error") && (isValidate = !1)
    }),
        document.querySelectorAll(".showContent .input-elmn").forEach(function (e) {
            return "" == e.value ? (e.nextElementSibling.classList.add("show-error"),
                e.nextElementSibling.innerHTML = "This field is required",
                e.nextElementSibling.style.visibility = "visible",
                isValidate = !1) : (isValidate && (e.nextElementSibling.classList.remove("show-error"),
                    e.nextElementSibling.innerHTML = "",
                    e.nextElementSibling.style.visibility = "hidden"),
                    isValidate)
        })
}

function keypressEvent(e) {
    if (!e.data)
        return;
    var t = e.data.charCodeAt(0);
    let n = e.target
        , a = +n.getAttribute("data-min")
        , i = +n.getAttribute("data-max")
        , r = n.value.replace(/,/g, "");
    t > 31 && (t < 48 || t > 57) ? (n.nextElementSibling.innerHTML = "Fill only Number",
        n.nextElementSibling.classList.add("show-error"),
        n.nextElementSibling.style.visibility = "visible",
        document.querySelectorAll(".range-lable").forEach(function (e) {
            e.style.display = "none"
        }),
        r = r.slice(0, r.length - 1),
        isValidate = !1) : +r < a ? (n.nextElementSibling.innerHTML = "Min " + n.getAttribute("data-text-prev") + " is " + commaSeparatorCurrency(a) + n.getAttribute("data-text-last"),
            n.nextElementSibling.classList.add("show-error"),
            n.nextElementSibling.style.visibility = "visible",
            isValidate = !1) : +r > i ? (n.nextElementSibling.innerHTML = "Max " + n.getAttribute("data-text-prev") + " is " + commaSeparatorCurrency(i) + n.getAttribute("data-text-last"),
                n.nextElementSibling.classList.add("show-error"),
                n.nextElementSibling.style.visibility = "visible",
                isValidate = !1) : (n.nextElementSibling.innerHTML = "",
                    n.nextElementSibling.classList.remove("show-error"),
                    n.nextElementSibling.style.visibility = "hidden",
                    isValidate = !0),
        e.target.value = commaSeparatorCurrency(r)
}
function commaSeprated(e) {
    let t = (e = e.toString()).substring(e.length - 3)
        , n = e.substring(0, e.length - 3);
    return "" != n && (t = "," + t),
        n.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + t
}
function commaSeparatorCurrency(e) {
    if (e && (e = (e += "").replace(/,/g, "")),
        +e) {
        var t = (e += "").split(".")[1]
            , n = (i = e.split(".")[0]).substring(i.length - 3)
            , a = i.substring(0, i.length - 3);
        "" != a && (n = "," + n);
        var i = a.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + n;
        return null == t ? i : i + "." + t
    }
    return e
}
function sipCalculator(e, t, n) {
    e = +e.replace(/,/g, "");
    var a, i = parseInt(n) / 1200;
    a = Math.round(e * (1 + i) * (Math.pow(1 + i, t) - 1) / i),
        document.getElementById("ammountRecived").innerHTML = commaSeprated(a) + " <span class='approxAmmount'>(" + currencyFormat(a) + ")</span>",
        document.getElementById("totalInvestAmount").innerHTML = commaSeprated(e * t) + " <span class='approxAmmount fnt13'>(" + currencyFormat(e * t) + ")</span>",
        document.getElementById("totalWealthGain").innerHTML = commaSeprated(a - e * t) + " <span class='approxAmmount fnt13'>(" + currencyFormat(a - e * t) + ")</span>"
}
function currencyFormat(e) {
    return e >= 1e3 && e < 99999 ? (e = (e / 1e3).toFixed(2) + " K",
        formatedValue = e) : e >= 1e5 && e < 9999999 ? (e = (e / 1e5).toFixed(2) + " lacs",
            formatedValue = e) : e >= 1e7 && e <= 1e8 ? (e = (e / 1e7).toFixed(2) + " cr",
                formatedValue = e) : e >= 1e8 && e < 9999999999 ? (e = (e / 1e7).toFixed(2) + " cr",
                    formatedValue = e) : formatedValue = commaSeprated(e)
}
function getMonthlyAmount(e, t, n) {
    e = +e.replace(/,/g, ""),
        t = +t.replace(/,/g, "");
    let a = 12 * (n = +n.replace(/,/g, ""));
    var r, l = 0;
    for (i = 0; i < a; i++)
        l += Math.pow(1 + t / 1200, a - i);
    return r = Math.round(e / l),
        document.getElementById("toInvestMontlySip").innerHTML = commaSeprated(r),
        commaSeprated(r)
}
validateField(),
    $(document).ready(function () {
        $('.sipCalculator input[type="radio"]').click(function () {
            var e = $(this).attr("value")
                , t = $("." + e);
            $(".showContent").not(t).removeClass("showContent"),
                $(t).addClass("showContent")
        }),
            $('.investment-details button[type="button"]').click(function () {
                if (validateField(),
                    isValidate) {
                    var e = document.getElementById("sipAmount").value
                        , t = 12 * document.getElementById("sipMonth").value
                        , n = document.getElementById("sipInterest").value;
                    document.getElementById("sipInvestAmmount").innerHTML = e,
                        document.getElementById("sipInvestYear").innerHTML = t / 12 + " Years",
                        document.getElementById("sipInvestRoi").innerHTML = n + "%",
                        $(".calculate-result-screen.investResult").addClass("shownow fadeInRight"),
                        $(".sipCalculator .calculator-inner-wrap").addClass("hidenow fadeInRight"),
                        sipCalculator(e, t, n)
                }
            }),
            $('.goal-details button[type="button"]').click(function () {
                if (validateField(),
                    isValidate) {
                    var e = document.getElementById("targetAmount").value
                        , t = document.getElementById("roi").value
                        , n = document.getElementById("tenure").value;
                    document.getElementById("goalInvestAmmount").innerHTML = e,
                        document.getElementById("goalInvestYear").innerHTML = n + " Years",
                        document.getElementById("goalInvestRoi").innerHTML = t + "%",
                        getMonthlyAmount(e, t, n),
                        $(".calculate-result-screen.goalResult").addClass("shownow fadeInRight"),
                        $(".sipCalculator .calculator-inner-wrap").addClass("hidenow fadeInRight")
                }
            }),
            $('.calculate-result-screen input[type="reset"]').click(function () {
                $(".sipCalculator .calculator-inner-wrap").removeClass("hidenow"),
                    $(".calculate-result-screen.investResult").removeClass("shownow fadeInRight"),
                    $(".calculate-result-screen.goalResult").removeClass("shownow fadeInRight")
            }),
            $('input[type="range"]').on("input", function () {
                var e = this.value
                    , t = $(this).attr("data-text")
                    , n = $(this).prev(".range-lable");
                $(this).parent().prev().children().find('input[type="tel"]').attr("data-max"),
                    $(this).parent().prev().children().find('input[type="tel"]').attr("data-min");
                e = e.replace(/,/g, ""),
                    n.show(),
                    $(this).parent().prev().children().find('input[type="tel"]').val(commaSeparatorCurrency(e)),
                    e >= 1e3 ? n.html(t + currencyFormat(e)) : n.html(currencyFormat(e) + t);
                var a = ($(this).val() - $(this).attr("min")) / ($(this).attr("max") - $(this).attr("min"));
                n.css({
                    left: 100 * a + "%",
                    right: "unset"
                }),
                    100 * a > 85 && n.css({
                        left: "unset",
                        right: "0"
                    }),
                    $(this).css("background-image", "-webkit-gradient(linear, left top, right top, color-stop(" + a + ", #00b98f), color-stop(" + a + ", #C5C5C5))"),
                    $(this).parent().prev().children().find('input[type="tel"]').next().removeClass("show-error"),
                    $(this).parent().prev().children().find('input[type="tel"]').next().html(""),
                    $(this).parent().prev().children().find('input[type="tel"]').next().css("visibility", "hidden")
            }),
            $('input[type="range"]').on("change", function () {
                $(this).prev(".range-lable").hide()
            }),
            $(".badge .mainvalue").on("input", function () {
                var e = $(this).val()
                    , t = $(this)
                    , n = $(this).attr("data-max")
                    , a = $(this).attr("data-min");
                !function (e, t, n, a) {
                    var i, r = $(t).parents().next().children("input"), l = ($(t).parents().next().children("input").attr("data-text"),
                        $(t).parents().eq(1).next().children("input").attr("min"),
                        e);
                    l = l.replace(/,/g, "");
                    var o = $(t).parents().next().children("input").prev(".range-lable");
                    r.val(e),
                        i = (r.val() - r.attr("min")) / (r.attr("max") - r.attr("min")),
                        0 == $(t).val().length || "" == $(t).val() ? (i = r.val("0"),
                            r.css("background-image", "-webkit-gradient(linear, left top, right top, color-stop(0, #00b98f), color-stop(0, #C5C5C5))"),
                            o.hide()) : +l < +a ? o.hide() : +l > +n && o.hide();
                    r.css("background-image", "-webkit-gradient(linear, left top, right top, color-stop(" + i + ", #00b98f), color-stop(" + i + ", #C5C5C5))")
                }(e = e.replace(/,/g, ""), t, n, a)
            }),
            $(".badge").click(function () {
                $(this).find("input").focus().val("");
                var e = $(this).parents().next().children("input");
                e.val("0"),
                    e.css("background-image", "-webkit-gradient(linear, left top, right top, color-stop(0, #00b98f), color-stop(0, #C5C5C5))")
            })
    }),
    document.querySelectorAll(".input-elmn").forEach(function (e) {
        e.addEventListener("input", keypressEvent)
    });
