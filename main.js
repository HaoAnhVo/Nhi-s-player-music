const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = "Nhi_Nguyen";

const player = $(".user");
const playlist = $(".playlist");
const controlBtn = $(".control");
const cd = $(".cd");
const heading = $(".dashboard__title");
const subHeading = $(".dashboard__subtitle");
const cdThumb = $(".cd-thumb");
const playBtn = $(".btn-toggle-play");
const audio = $("#audio");
const progress = $("#progress");
const currentTime = $(".time--current");
const timeRight = $(".time--total");
const prevBtn = $(".btn-prev");
const nextBtn = $(".btn-next");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const volBtn = $(".btn-volume");
const volBar = $(".volume-bar");
const iconMute = $(".icon-mute");
const iconUnmute = $(".icon-unmute");
const faceBtn = $(".btn-face");
const bgColor = $("body");

const wave = $$(".wave");

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    currentVol: 1,
    lockVol: 1,
    isFace: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    setConfig: function (key, value) {
        this.config[key] = value;
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
    },
    songs: [
        {
            name: "Don't Côi",
            singer: "RPT Orijinn, Ronboogz",
            path: "./assets/music/song1.mp3",
            image: "./assets/img/song1.png",
        },
        {
            name: "Tell Ur Mom II",
            singer: "Winno, Heily, Hiderway",
            path: "./assets/music/song2.mp3",
            image: "./assets/img/song2.png",
        },
        {
            name: "Chơi",
            singer: "HIEUTHUHAI, MANBO",
            path: "./assets/music/song3.mp3",
            image: "./assets/img/song3.png",
        },
        {
            name: "Bật nhạc lên",
            singer: "HIEUTHUHAI, Harmonie",
            path: "./assets/music/song4.mp3",
            image: "./assets/img/song4.png",
        },
        {
            name: "Sau cơn mưa",
            singer: "Coolkids, Quang Anh Rhyder",
            path: "./assets/music/song5.mp3",
            image: "./assets/img/song5.png",
        },
        {
            name: "Điều bí mật",
            singer: "Binz, It's Lee",
            path: "./assets/music/song6.mp3",
            image: "./assets/img/song6.png",
        },
        {
            name: "Lan man",
            singer: "Ronboogz",
            path: "./assets/music/song7.mp3",
            image: "./assets/img/song7.png",
        },
        {
            name: "Ngoại lệ của nhau",
            singer: "Obito",
            path: "./assets/music/song8.mp3",
            image: "./assets/img/song8.png",
        },
        {
            name: "Shhhhhhhhhh..",
            singer: "Wean, tlinh",
            path: "./assets/music/song9.mp3",
            image: "./assets/img/song9.png",
        },
        {
            name: "Mắt xanh",
            singer: "Gill, tlinh, Kewtie",
            path: "./assets/music/song10.mp3",
            image: "./assets/img/song10.png",
        },
        {
            name: "Có em",
            singer: "Madihu, Low G",
            path: "./assets/music/song11.mp3",
            image: "./assets/img/song11.png",
        },
        {
            name: "Thích em hơi nhiều",
            singer: "Wren Evans",
            path: "./assets/music/song12.mp3",
            image: "./assets/img/song12.png",
        },
        {
            name: "Ex's Hate Me",
            singer: "B ray, Amee, Masew",
            path: "./assets/music/song13.mp3",
            image: "./assets/img/song13.png",
        },
        {
            name: "Lời đường mật",
            singer: "HIEUTHUHAI, LyLy",
            path: "./assets/music/song14.mp3",
            image: "./assets/img/song14.png",
        },
        {
            name: "Cua",
            singer: "HIEUTHUHAI, MANBO",
            path: "./assets/music/song15.mp3",
            image: "./assets/img/song15.png",
        },
        {
            name: "Không thể say",
            singer: "HIEUTHUHAI",
            path: "./assets/music/song16.mp3",
            image: "./assets/img/song16.png",
        },
    ],

    render: function () {
        const htmls = this.songs.map((song, index) => {
            return `
                <div class="playlist__song ${
                    index === this.currentIndex ? "active" : ""
                }" data-index="${index}">
                    <div
                        class="playlist__thumb"
                        style="
                            background-image: url('${song.image}');
                        "
                    ></div>
                    <div class="playlist__body">
                        <h3 class="playlist__title">${song.name}</h3>
                        <p class="playlist__author">${song.singer}</p>
                    </div>
                    <div class="playlist__option" data-index=${index}>
                        <i class="fas fa-ellipsis"></i>
                        <div class = "playlist__option-child">
                            <a class = "download" href = "" download = "" data-index = ${index}>
                                <i class="fa-solid fa-cloud-arrow-down"></i>
                                Tải xuống   
                            </a>
                            <a class = "delete" data-index = ${index}>
                                <i class="fa-solid fa-trash-can"></i>
                                Xóa khỏi danh sách
                            </a>
                        </div> 
                    </div>
                </div>
            `;
        });
        $(".playlist").innerHTML = htmls.join("");
    },

    defineProperties: function () {
        Object.defineProperty(this, "currentSong", {
            get: function () {
                return this.songs[this.currentIndex];
            },
        });
    },
    handleEvents: function () {
        const _this = this;
        // Xử lý CD quay / dừng
        const cdThumbAnimate = cdThumb.animate(
            [
                {
                    transform: "rotate(360deg)",
                },
            ],
            {
                duration: 10000,
                iterations: Infinity,
            }
        );
        cdThumbAnimate.pause();

        // Xử lý khi click play
        playBtn.onclick = function () {
            if (_this.isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
        };

        //Khi bài hát played
        audio.onplay = function () {
            _this.isPlaying = true;
            player.classList.add("playing");
            controlBtn.classList.add("playing");
            cdThumbAnimate.play();
            wave.forEach((element) => {
                element.style.width = "3px";
                element.classList.remove("paused");
            });
        };

        // Khi bài hát paused
        audio.onpause = function () {
            _this.isPlaying = false;
            player.classList.remove("playing");
            controlBtn.classList.remove("playing");
            cdThumbAnimate.pause();
            wave.forEach((element) => {
                element.classList.add("paused");
            });
        };

        //Load ra độ dài của bài hát
        audio.onloadedmetadata = function () {
            timeRight.textContent = _this.formatTime(audio.duration);
            currentTime.textContent = _this.formatTime(audio.currentTime);
        };

        // Khi prev bài hát
        prevBtn.onclick = function () {
            if (_this.isRandom) {
                _this.randomSong();
            } else {
                _this.prevSong();
            }
            audio.play();
            _this.render();
            _this.scrollToActiveSong();
        };

        // Khi next bài hát
        nextBtn.onclick = function () {
            if (_this.isRandom) {
                _this.randomSong();
            } else {
                _this.nextSong();
            }

            audio.play();
            _this.render();
            _this.scrollToActiveSong();
        };

        //Volume-Bar
        volBar.oninput = (e) => {
            this.setConfig("currentVol", e.target.value);
            audio.volume = volBar.value;
        };

        //Change-Volume
        audio.onvolumechange = () => {
            volBar.value = audio.volume;
            volBar.style.background = `linear-gradient(to right, var(--control-color) ${
                audio.volume * 100
            }%, #d9d9d9 ${10 - audio.volume}% )`;
            if (audio.volume === 0) {
                iconMute.style.visibility = "visible";
                iconUnmute.style.visibility = "hidden";
            } else {
                iconMute.style.visibility = "hidden";
                iconUnmute.style.visibility = "visible";
            }
        };

        //Mute-Volume
        iconUnmute.onclick = (e) => {
            this.setConfig("lockVol", audio.volume);
            audio.volume = 0;
            this.setConfig("currentVol", audio.volume);
        };

        //Unmute-Volume
        iconMute.onclick = (e) => {
            audio.volume = this.config.lockVol;
            this.setConfig("currentVol", audio.volume);
        };

        // Xử lý bật / tắt random
        randomBtn.onclick = function () {
            _this.isRandom = !_this.isRandom;
            _this.setConfig("isRandom", _this.isRandom);
            randomBtn.classList.toggle("active", this.isRandom);
        };

        // Xử lý bật / tắt repeat
        repeatBtn.onclick = function () {
            _this.isRepeat = !_this.isRepeat;
            _this.setConfig("isRepeat", _this.isRepeat);
            repeatBtn.classList.toggle("active", this.isRepeat);
        };

        // xử lý khi tiến độ bài hát thay đổi
        audio.addEventListener("timeupdate", function () {
            if (audio.duration) {
                const progressPercent = Math.floor(
                    (audio.currentTime / audio.duration) * 100
                );
                progress.value = progressPercent;
                currentTime.textContent = _this.formatTime(audio.currentTime);
                progress.style.background = `linear-gradient(to right, var(--control-color) ${
                    (audio.currentTime / audio.duration) * 95
                }%, #d9d9d9 ${(audio.currentTime / audio.duration) * 100}% )`;
            }
        });

        // xử khi khi tua bài hát
        progress.addEventListener("change", function (e) {
            // audio.duration / 100 có tác dụng thời gian hiện tại thành đơn vị %
            const seekTime = (audio.duration / 100) * e.target.value;
            audio.currentTime = seekTime;
        });

        // Xử lý next bài hát khi hết bài đang phát
        audio.onended = function () {
            // console.log(isRandom, isRepeat);
            if (_this.isRandom && _this.isRepeat) {
                audio.pause();
                alert(
                    "Chế độ lặp lại và phát ngẫu nhiên đang được bật cùng lúc ! Vui lòng chọn cố định 1 chức năng để tiếp tục phát nhạc"
                );
            } else if (_this.isRepeat) {
                audio.play();
            } else if (_this.isRandom) {
                nextBtn.click();
            } else {
                nextBtn.click();
            }
        };

        // Xử lý sự kiện nhấn vào bài hát
        playlist.onclick = function (e) {
            const songNode = e.target.closest(".playlist__song:not(.active)");
            const optionNode = e.target.closest(".playlist__option");
            const optionChildNode = e.target.closest(".playlist__option-child");
            const downloadNode = e.target.closest(".download");
            const deleteNode = e.target.closest(".delete");

            const handleClick = (index) => {
                _this.currentIndex = index;
                _this.loadCurrentSong();
                _this.render();
                _this.scrollToActiveSong();
                audio.play();
            };

            if (songNode && !optionNode) {
                handleClick(Number(songNode.dataset.index));
            }

            if (optionNode && !optionChildNode) {
                _this.currentIndex = Number(optionNode.dataset.index);
                optionNode.classList.toggle("active");
            }

            if (downloadNode && !deleteNode) {
                handleClick(Number(downloadNode.dataset.index));
                downloadNode.href = _this.currentSong.path;
                downloadNode.download = `${_this.currentSong.name} - ${_this.currentSong.singer}.mp3`;
                setTimeout(function () {
                    _this.toastMessage({
                        title: "Đã tải xong !",
                        message: "Hãy kiểm tra trong thư mục download của bạn",
                        type: "success",
                        duration: 3000,
                    });
                }, 3000);
            }

            if (deleteNode && !downloadNode) {
                const indexDelete = Number(deleteNode.dataset.index);
                if (_this.isPlaying) {
                    alert(
                        "Bài hát đang được phát, hãy tắt nó để có thể xóa bài hát !"
                    );
                    return;
                }
                if (_this.songs.length <= 1) {
                    _this.toastMessage({
                        title: "Thất bại !",
                        message: "Không thể xóa bài hát cuối cùng",
                        type: "error",
                        fadeTime: 1000,
                        duration: 3000,
                    });
                    return;
                }
                const checkDelete = confirm("Bạn chắn chắn muốn xóa bài này !");

                if (checkDelete) {
                    _this.removeSong(indexDelete);
                    _this.toastMessage({
                        title: "Thành công !",
                        message: "Đã xóa bài hát khỏi danh sách",
                        type: "success",
                        fadeTime: 1000,
                        duration: 3000,
                    });
                } else {
                    return;
                }
            }
        };

        //Background-Theme
        faceBtn.onclick = function () {
            const songs = $$(".playlist__song");
            const listColor = $(".right-bar");
            const userFixedColor = $(".user__fixed");
            const bgMain = $(".main");

            _this.isFace = !_this.isFace;
            if (_this.isFace) {
                bgColor.style.background =
                    "linear-gradient(360deg, #ff5fdf 0%, #f1857f 100%)";
                bgMain.style.background =
                    "linear-gradient(360deg, #ff5fdf 0%, #f1857f 100%)";
                listColor.classList.add("bg");
                userFixedColor.classList.add("bg");
                songs.forEach(function (song) {
                    song.querySelector("h3").style.color = "#22bf9c";
                });
            } else {
                bgColor.style.background = "";
                bgMain.style.background = "";
                listColor.classList.remove("bg");
                userFixedColor.classList.remove("bg");
                songs.forEach(function (song) {
                    song.querySelector("h3").style.color = "";
                });
            }
            faceBtn.classList.toggle("active", _this.isFace);
            _this.setConfig("isFace", _this.isFace);
        };
    },

    // Toast
    toastMessage: function ({
        title = "",
        message = "",
        type = "",
        fadeTime = "",
        duration = "",
    }) {
        const toastParent = document.querySelector("#toast");

        if (toastParent) {
            const toastChild = document.createElement("div");

            //Auto remove the toast
            const autoRemoveId = setTimeout(function () {
                toastParent.removeChild(toastChild);
            }, duration + fadeTime);

            //Remove toast when close clicked
            toastChild.onclick = function (e) {
                if (e.target.closest(".toast__close")) {
                    toastParent.removeChild(toastChild);
                    clearTimeout(autoRemoveId);
                }
            };
            const icons = {
                success: "fa-solid fa-circle-check",
                error: "fa-solid fa-exclamation-circle",
            };
            const icon = icons[type];
            const fadeTimeOut = (fadeTime / 1000).toFixed(2);
            const delayTime = (duration / 1000).toFixed(2);

            toastChild.classList.add("toast", `toast--${type}`);
            toastChild.style.animation = `slideInLeft ease 0.3s, fadeOut linear ${fadeTimeOut}s ${delayTime}s forwards`;
            toastChild.innerHTML = `
                <div class="toast__icon">
                    <i class="${icon}"></i>
                </div>
                <div class="toast__body">
                    <h3 class="toast__title">${title}</h3>
                    <p class="toast__msg">${message}</p>
                </div>
                <div class="toast__close">
                    <i class="fa-solid fa-circle-xmark"></i>
                </div>
            `;
            toastParent.appendChild(toastChild);
        }
    },

    scrollToActiveSong: function () {
        setTimeout(() => {
            $(".playlist__song.active").scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "end",
            });
        }, 200);
    },

    loadCurrentSong: function () {
        heading.textContent = this.currentSong.name;
        subHeading.textContent = this.currentSong.singer;
        cdThumb.style.backgroundImage = `url(${this.currentSong.image})`;
        audio.src = this.currentSong.path;
    },

    // Hàm format time của bài hát thành xx:xx
    formatTime: function (time) {
        let min = Math.floor(time / 60);
        let sec = Math.floor(time % 60);
        min = min < 10 ? "0" + min : min;
        sec = sec < 10 ? "0" + sec : sec;
        return min + ":" + sec;
    },

    //Xử lý khi prev bài hát
    prevSong: function () {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
    },

    //Xử lý khi next bài hát
    nextSong: function () {
        this.currentIndex++;
        if (this.currentIndex > this.songs.length - 1) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },

    loadConfig: function () {
        this.isRandom = this.config.isRandom;
        this.isRepeat = this.config.isRepeat;
        this.isFace = this.config.isFace;
    },

    randomSong: function () {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * this.songs.length);
        } while (newIndex === this.currentIndex);

        this.currentIndex = newIndex;
        this.loadCurrentSong();
    },

    removeSong: function (index) {
        this.songs.splice(index, 1);
        this.render();
    },

    start: function () {
        // Render playlist
        this.render();

        //Định nghĩa các thuộc tính cho object
        this.defineProperties();

        //Tải thông tin bài hát đầu tiên
        this.loadCurrentSong();

        //Lắng nghe / xử lý các sự kiện (DOM events)
        this.handleEvents();

        // Hiển thị trạng thái ban đầu của button repeat & random
        repeatBtn.classList.toggle("active", this.isRepeat);
        randomBtn.classList.toggle("active", this.isRandom);
        faceBtn.classList.toggle("active", this.isFace);
        volBar.style.background = `var(--control-color)`;
    },
};

app.start();
