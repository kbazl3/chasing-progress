/*jshint esversion: 6 */


angular.module('chasingProgress')
    .controller('homeCtrl', function($scope, $sce) {


        const quotes = [
            {
                quote:"You have to learn the rules of the game. And then you have to play better than anyone else.",
                author:"Albert Einstein"
            },
            {
                quote:"Whether you think you can, or you think you can't - you're right.",
                author:"Henry Ford"
            },
            {
                quote:"The way to get started is to quit talking and begin doing.",
                author:"Walt Disney"
            },
            {
                quote:"If your actions inspire others to dream more, learn more, do more and become more, you are a leader.",
                author:"John Quincy Adams"
            },
            {
                quote:"You've got to get up every morning with determination if you're going to go to bed with satisfaction.",
                author:" George Lorimer"
            },
            {
                quote:"A life lived in fear is half lived.",
                author:"Baz Luhrmann"
            },
            {
                quote:"We are like tea-bags. You don't know you're own strength til your in hot water.",
                author:"Sister Busche"
            },
            {
                quote:"Success is a journey, not a destination. The doing is often more important than the outcome",
                author:"Arthur Ashe"
            },
            {
                quote: "Every morning in Africa, a gazelle wakes up.It knows it must run faster than the fastest lion or it will be killed.  Every morning a lion wakes up.It knows it must outrun the slowest gazelle or it will starve to death.  It doesn’t matter whether you are a lion or a gazelle. When the sun comes up, you better start running.",
                author:"Anonymous"
            },
            {
                quote:"Self-discipline is an act of cultivation. It requires you to connect today's actions to tomorrow's results. There's a season for sowing and a season for reaping. Self-discipline helps you know which is which.",
                author:"Gary Ryan Blair"
            },
            {
                quote:"Self-disciplined begins with the mastery of your thoughts. If you don't control what you think, you can't control what you do. Simply, self-discipline enables you to think first and act afterward.",
                author:"Napoleon Hill"
            },
            {
                quote:"Self-discipline is a form of freedom. Freedom from laziness and lethargy, freedom from the expectations and demands of others, freedom from weakness and fear—and doubt. Self-discipline allows a pitcher to feel his individuality, his inner strength, his talent. He is master of, rather than a slave to, his thoughts and emotions.",
                author:"H.A. Dorfman"
            },
            {
                quote:"The individual who wants to reach the top in business must appreciate the might and force of habit. He must be quick to break those habits that can break him—and hasten to adopt those practices that will become the habits that help him achieve the success he desires.",
                author:"J. Paul Getty"
            },
            {
                quote: "Mental toughness is many things and rather difficult to explain. Its qualities are sacrifice and self-denial. Also, most importantly, it is combined with a perfectly disciplined will that refuses to give in. It's a state of mind-you could call it character in action.",
                author: "Vince Lombard"
            },
            {
                quote:"We are what we repeatedly do, excellence then is not an act, but a habit.",
                author:"Aristotle"
            },
            {
                quote:"It is necessary to try to surpass one's self always: this occupation ought to last as long as life.",
                author:"Queen Christina of Sweden"
            },{
                quote:"Talent without discipline is like an octopus on roller skates. There's plenty of movement, but you never know if it's going to be forward, backwards, or sideways.",
                author:"H. Jackson Brown, Jr."
            },
            {
                quote:"The problem with patience and discipline is that it requires both of them to develop each of them.",
                author:"Thomas M. Sterner"
            },
            {
                quote:"Whoever submits himself to a super-discipline can expect great triumphs",
                author:"Samael Aun Weor"
            },
            {
                quote:"The most powerful control we can ever attain, is to be in control of ourselves.",
                author:"Chris Page"
            },
            {
                quote:"The essence of self-discipline is to do the important thing rather than the urgent thing.",
                author:"Barry Werner"
            },
            {
                quote:"You will never have a greater or lesser dominion than that over yourself...the height of a man's success is gauged by his self-mastery; the depth of his failure by his self-abandonment. ...And this law is the expression of eternal justice. He who cannot establish dominion over himself will have no dominion over others.",
                author:"Leonardo da Vinci"
            },
            {
                quote: "If you dedicate your attention to discipline in your life you become smarter while you are writing than while you are hanging out with your pals or in any other line of work.",
                author:"Russell Banks"
            },
            {
                quote:"Do not bite at the bait of pleasure till you know there is no hook beneath it.",
                author:"Thomas Jefferson"
            },
            {
                quote:"Whether our action is wholesome or unwholesome depends on whether that action or deed arises from a disciplined or undisciplined state of mind. It is felt that a disciplined mind leads to happiness and an undisciplined mind leads to suffering, and in fact it is said that bringing about discipline within one's mind is the essence of the Buddha's teaching.",
                author:"Dalai Lama XIV"
            },
            {
                quote:"Why is discipline important? Discipline teaches us to operate by principle rather than desire. Saying no to our impulses (even the ones that are not inherently sinful) puts us in control of our appetites rather than vice versa. It deposes our lust and permits truth, virtue, and integrity to rule our minds instead.",
                author:"John MacArthur"
            },
            {
                quote:"Self-control is the chief element in self-respect, and self-respect is the chief element in courage.",
                author:"Thucydides"
            },
            {
                quote:" Perhaps the most valuable result of all education is the ability to make yourself do the thing you have to do, whether you like it or not.",
                author:"Thomas Henry Huxley"
            },
            {
                quote:" Self-respect is the root of discipline: The sense of dignity grows with the ability to say no to oneself.",
                author:"Abraham Joshua Heschel"
            },
            {
                quote:" “Class is an aura of confidence that is being sure without being cocky. Class has nothing to do with money. Class never runs scared. It is self-discipline and self-knowledge. It's the sure-footedness that comes with having proved you can meet life.",
                author:"Ann Landers"
            },
            {
                quote:"I do not enlighten those who are not eager to learn, nor arousethose who are not anxious to give an explanation themselves.If I have presented one corner of the square and they cannotcome back to me with the other three, I should not go overthe points again.",
                author: "Confucius"
            }
        ];
        const embeddedHtml = [
            {
                video: 'youll do fookin nuttin'
            },
            {
                video: '<iframe width="560" height="315" src="https://www.youtube.com/embed/5mvV6ZlZf8U" frameborder="0" allowfullscreen></iframe>'
            },
            {
                video: '<iframe width="560" height="315" src="https://www.youtube.com/embed/khOaAHK7efc" frameborder="0" allowfullscreen></iframe>'
            },
            {
                video: '<iframe width="560" height="315" src="https://www.youtube.com/embed/lsSC2vx7zFQ" frameborder="0" allowfullscreen></iframe>'
            },
            {
                video: '<iframe width="560" height="315" src="https://www.youtube.com/embed/UhD3_dxKNd8" frameborder="0" allowfullscreen></iframe>'
            },
            {
                video: '<iframe width="560" height="315" src="https://www.youtube.com/embed/hbkZrOU1Zag" frameborder="0" allowfullscreen></iframe>'
            },
            {
                video: '<iframe width="560" height="315" src="https://www.youtube.com/embed/g-jwWYX7Jlo" frameborder="0" allowfullscreen></iframe>'
            },
            {
                video: '<iframe width="560" height="315" src="https://www.youtube.com/embed/MBRqu0YOH14" frameborder="0" allowfullscreen></iframe>'
            },
            {
                video: '<iframe width="560" height="315" src="https://www.youtube.com/embed/e_eJRDl2J6Y" frameborder="0" allowfullscreen></iframe>'
            },
            {
                video: '<iframe width="560" height="315" src="https://www.youtube.com/embed/67Vp7fTgQ3g" frameborder="0" allowfullscreen></iframe>'
            },
            {
                video: '<iframe width="560" height="315" src="https://www.youtube.com/embed/bIXOo8D9Qsc" frameborder="0" allowfullscreen></iframe>'
            },
            {
                video: '<iframe width="560" height="315" src="https://www.youtube.com/embed/5fsm-QbN9r8" frameborder="0" allowfullscreen></iframe>'
            },
            {
                video: '<iframe width="560" height="315" src="https://www.youtube.com/embed/Ela3ChTzFcA" frameborder="0" allowfullscreen></iframe>'
            },
            {
                video: '<iframe width="560" height="315" src="https://www.youtube.com/embed/UNQhuFL6CWg" frameborder="0" allowfullscreen></iframe>'
            },
            {
                video: '<iframe width="560" height="315" src="https://www.youtube.com/embed/Cbk980jV7Ao" frameborder="0" allowfullscreen></iframe>'
            },
            {
                video: '<iframe width="560" height="315" src="https://www.youtube.com/embed/yX39J_YyKbs" frameborder="0" allowfullscreen></iframe>'
            },
            {
                video: '<iframe width="560" height="315" src="https://www.youtube.com/embed/ltun92DfnPY" frameborder="0" allowfullscreen></iframe>'
            },
            {
                video: '<iframe width="560" height="315" src="https://www.youtube.com/embed/gww9_S4PNV0" frameborder="0" allowfullscreen></iframe>'
            },
            {
                video: '<iframe width="560" height="315" src="https://www.youtube.com/embed/il9yftGwoNc" frameborder="0" allowfullscreen></iframe>'
            },
            {
                video: '<iframe width="560" height="315" src="https://www.youtube.com/embed/WibmcsEGLKo" frameborder="0" allowfullscreen></iframe>'
            },
            {
                video: '<iframe width="560" height="315" src="https://www.youtube.com/embed/aV805a2XJgA" frameborder="0" allowfullscreen></iframe>'
            },
            {
                video: '<iframe width="560" height="315" src="https://www.youtube.com/embed/7o4O3U220GE" frameborder="0" allowfullscreen></iframe>'
            },
            {
                video: '<iframe width="560" height="315" src="https://www.youtube.com/embed/wupToqz1e2g" frameborder="0" allowfullscreen></iframe>'
            },
            {
                video: '<iframe width="560" height="315" src="https://www.youtube.com/embed/8CrOL-ydFMI" frameborder="0" allowfullscreen></iframe>'
            },
            {
                video: '<iframe width="560" height="315" src="https://www.youtube.com/embed/mMRrCYPxD0I" frameborder="0" allowfullscreen></iframe>'
            },
            {
                video: '<iframe width="560" height="315" src="https://www.youtube.com/embed/Lp7E973zozc" frameborder="0" allowfullscreen></iframe>'
            },
            {
                video: '<iframe width="560" height="315" src="https://www.youtube.com/embed/D9Ihs241zeg" frameborder="0" allowfullscreen></iframe>'
            },
            {
                video: '<iframe width="560" height="315" src="https://www.youtube.com/embed/iCvmsMzlF7o" frameborder="0" allowfullscreen></iframe>'
            },
            {
                video: '<iframe width="560" height="315" src="https://www.youtube.com/embed/Ks-_Mh1QhMc" frameborder="0" allowfullscreen></iframe>'
            },
            {
                video: '<iframe width="560" height="315" src="https://www.youtube.com/embed/4q1dgn_C0AU" frameborder="0" allowfullscreen></iframe>'
            },
            {
                video: '<iframe width="560" height="315" src="https://www.youtube.com/embed/sioZd3AxmnE" frameborder="0" allowfullscreen></iframe>'
            },
            {
                video: '<iframe width="560" height="315" src="https://www.youtube.com/embed/IRVdiHu1VCc" frameborder="0" allowfullscreen></iframe>'
            },
            {
                video: '<iframe width="560" height="315" src="https://www.youtube.com/embed/ljqra3BcqWM" frameborder="0" allowfullscreen></iframe>'
            }


        ];


        $scope.dailyQuote = quotes[new Date().getDate()];
        $scope.video = $sce.trustAsHtml(embeddedHtml[new Date().getDate()].video);


    });
