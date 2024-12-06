// 사용자 하드 코딩 영역

//태풍예측1
const TYPHOON1_NAME = "YINXING"; //태풍 이름
const TYPHOON1_SEQ = 22; //태풍 발생 호

//태풍예측2
const TYPHOON2_NAME = "TORAJI"; //태풍 이름
const TYPHOON2_SEQ = 23; //태풍 발생 호

//태풍예측3
const TYPHOON3_NAME = "MAN-YI"; //태풍 이름
const TYPHOON3_SEQ = 24; //태풍 발생 호

//태풍예측4
const TYPHOON4_NAME = "USAGI"; //태풍 이름
const TYPHOON4_SEQ = 25; //태풍 발생 호


// 상수 선언

const UTC_TIME = 9 * 60 * 60 * 1000;

let currentTimeInterval = null;
let currentScreenIndex = 1;
let currentRightSrc = "";
let selectedTime = null;
let currentTime = new Date();
let isPlaying = false;

const $slideDate = document.querySelector("#slideDate");
const $screenLeft = document.querySelector("#screenLeft img");
const $screenRight = document.querySelector("#screenRight img");

const $datePicker = document.querySelector("#datePicker");
const $timeSlider = document.querySelector("#timeSlider");
const dateStr = changeDateFormat(null, 4);

//태풍 시간 1
//업데이트 시간 설정(51), 업데이트 분(55), 정시/30분 구분(71), 태풍 호수 / 태풍(63) 열대저압부 구분(64) (73)
function generateT1Url() {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();

    // 업데이트 시간 설정
    const updateHours = [4, 10, 16, 22];

    // 가장 최근 업데이트 시간을 찾기 위한 로직
    let lastUpdateHour = updateHours.slice().reverse().find(hour =>
        currentHour > hour || (currentHour === hour && currentMinute >= 5)
    );

    // 만약 아침 4시 이전에 접속했고, 가장 최근 업데이트 시간이 22시라면
    // 이전 날짜의 22시 자료를 사용
    if (!lastUpdateHour && currentHour < 4) {
        lastUpdateHour = 22;
        currentDate.setDate(currentDate.getDate() - 1);
    } else if (!lastUpdateHour) {
        // 그 외의 경우 가장 늦은 시간인 22시를 가장 최근 업데이트 시간으로 설정
        lastUpdateHour = 22;
    }

    // URL을 위한 날짜와 시간 설정
    const yearMonth = `${currentDate.getFullYear()}${String(currentDate.getMonth() + 1).padStart(2, '0')}`;
    const day = `${String(currentDate.getDate()).padStart(2, '0')}`;
    const timeSuffix = `${String(lastUpdateHour).padStart(2, '0')}00`;

    const url = `https://dmdw.kma.go.kr/data/IDS/IMG/${yearMonth}/${day}/RTKO63_108_${yearMonth}${day}${timeSuffix}_24_1.png`;
    return url;
}

//태풍 시간 2
//업데이트 시간 설정(87), 업데이트 분(91), 정시/30분 구분(107), 태풍(63) 열대저압부 구분(64) (109)
function generateT2Url() {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();

    // 업데이트 시간 설정
    const updateHours = [4, 10, 16, 22];

    // 가장 최근 업데이트 시간을 찾기 위한 로직
    let lastUpdateHour = updateHours.slice().reverse().find(hour =>
        currentHour > hour || (currentHour === hour && currentMinute >= 35)
    );

    // 만약 아침 4시 이전에 접속했고, 가장 최근 업데이트 시간이 22시라면
    // 이전 날짜의 22시 자료를 사용
    if (!lastUpdateHour && currentHour < 4.6) {
        lastUpdateHour = 22;
        currentDate.setDate(currentDate.getDate() - 1);
    } else if (!lastUpdateHour) {
        // 그 외의 경우 가장 늦은 시간인 22시를 가장 최근 업데이트 시간으로 설정
        lastUpdateHour = 22;
    }

    // URL을 위한 날짜와 시간 설정
    const yearMonth = `${currentDate.getFullYear()}${String(currentDate.getMonth() + 1).padStart(2, '0')}`;
    const day = `${String(currentDate.getDate()).padStart(2, '0')}`;
    const timeSuffix = `${String(lastUpdateHour).padStart(2, '0')}30`; // 30분에 해당하는 이미지

    const url = `https://dmdw.kma.go.kr/data/IDS/IMG/${yearMonth}/${day}/RTKO63_108_${yearMonth}${day}${timeSuffix}_24_1.png`;
    return url;
}

//태풍 시간 3
//업데이트 시간 설정(120), 업데이트 분(124), 정시/30분 구분(140), 태풍(63) 열대저압부 구분(64) (142)
function generateT3Url() {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();

    // 업데이트 시간 설정
    const updateHours = [5, 11, 17, 23];

    // 가장 최근 업데이트 시간을 찾기 위한 로직
    let lastUpdateHour = updateHours.slice().reverse().find(hour =>
        currentHour > hour || (currentHour === hour && currentMinute >= 5)
    );

    // 만약 아침 4시 이전에 접속했고, 가장 최근 업데이트 시간이 22시라면
    // 이전 날짜의 22시 자료를 사용
    if (!lastUpdateHour && currentHour < 4.6) {
        lastUpdateHour = 23;
        currentDate.setDate(currentDate.getDate() - 1);
    } else if (!lastUpdateHour) {
        // 그 외의 경우 가장 늦은 시간인 22시를 가장 최근 업데이트 시간으로 설정
        lastUpdateHour = 23;
    }

    // URL을 위한 날짜와 시간 설정
    const yearMonth = `${currentDate.getFullYear()}${String(currentDate.getMonth() + 1).padStart(2, '0')}`;
    const day = `${String(currentDate.getDate()).padStart(2, '0')}`;
    const timeSuffix = `${String(lastUpdateHour).padStart(2, '0')}00`; // 30분에 해당하는 이미지

    const url = `https://dmdw.kma.go.kr/data/IDS/IMG/${yearMonth}/${day}/RTKO63_108_${yearMonth}${day}${timeSuffix}_24_1.png`;
    return url;
}

//태풍 시간 4
//업데이트 시간 설정(154), 업데이트 분(159), 정시/30분 구분(174), 태풍(63) 열대저압부 구분(64) (176)

function generateT4Url() {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();

    // 업데이트 시간 설정
    const updateHours = [5, 11, 17, 23];

    // 가장 최근 업데이트 시간을 찾기 위한 로직
    let lastUpdateHour = updateHours.slice().reverse().find(hour =>
        currentHour > hour || (currentHour === hour && currentMinute >= 35)
    );

    // 만약 아침 4시 이전에 접속했고, 가장 최근 업데이트 시간이 22시라면
    // 이전 날짜의 22시 자료를 사용
    if (!lastUpdateHour && currentHour < 4.6) {
        lastUpdateHour = 23;
        currentDate.setDate(currentDate.getDate() - 1);
    } else if (!lastUpdateHour) {
        // 그 외의 경우 가장 늦은 시간인 22시를 가장 최근 업데이트 시간으로 설정
        lastUpdateHour = 23;
    }

    // URL을 위한 날짜와 시간 설정
    const yearMonth = `${currentDate.getFullYear()}${String(currentDate.getMonth() + 1).padStart(2, '0')}`;
    const day = `${String(currentDate.getDate()).padStart(2, '0')}`;
    const timeSuffix = `${String(lastUpdateHour).padStart(2, '0')}30`; // 30분에 해당하는 이미지

    const url = `https://dmdw.kma.go.kr/data/IDS/IMG/${yearMonth}/${day}/RTKO63_108_${yearMonth}${day}${timeSuffix}_25_1.png`;
    return url;
}

    //이미지 링크
const baseImages = {
    //화면 1 ~ 7

    //레이더영상(1)
    screen1_left_default: `https://radar.kma.go.kr/cgi-bin/center/nph-rdr_cmp_img?tm={T1}&cmp=HSP&qcd=HSO&obs=ECHD&map=HC&size=800&xp=-9999&yp=-9999&zoom=1&wv=00&ht=1500&color=C4&topo=1&ZRa=&ZRb=&lat=&lon=&lonlat=0&x1=&y1=&x2=&y2=&center=0&typ=0&aws=01&wt=0`,
    screen1_right_default: `https://afso.kma.go.kr/cgi/rdr/nph-rdr_cmp1_img?tm={T1}&cmp=HSP&qcd=HSLP&obs=ECHD&color=C4&aws=0&acc=0&map=HC&grid=2&legend=1&size=700&itv=5&zoom_level=1&zoom_x=3350000&zoom_y=5120000&gov=`,
    //레이더영상(2)
    screen2_left_default: `https://radar.kma.go.kr/cgi-bin/center/nph-rdr_cmp_img?tm={T1}&cmp=OTH&qcd=HSO&obs=ECHD&map=H3&size=800&xp=-9999&yp=-9999&zoom=1&wv=00&ht=1500&color=C4&topo=1&ZRa=&ZRb=&lat=&lon=&lonlat=1&x1=&y1=&x2=&y2=&center=0&typ=0&aws=01&wt=0`,
    screen2_right_default: `https://radar.kma.go.kr/cgi-bin/center/nph-rdr_cmp_img?tm={T1}&cmp=HSP&qcd=HSO&obs=ECHD&map=HC&size=800&xp=-9999&yp=-9999&zoom=1&wv=00&ht=1500&color=C4&topo=1&ZRa=&ZRb=&lat=&lon=&lonlat=0&x1=&y1=&x2=&y2=&center=0&typ=0&aws=01&wt=0`,
    //레이더영상(3)
    screen3_left_default: `https://radar.kma.go.kr/cgi-bin/center/nph-rdr_cmp_img?tm={T1}&cmp=HSP&qcd=HSO&obs=ECHD&map=HC&size=800&xp=-9999&yp=-9999&zoom=1&wv=00&ht=1500&color=C4&topo=1&ZRa=&ZRb=&lat=&lon=&lonlat=0&x1=&y1=&x2=&y2=&center=0&typ=0&aws=01&wt=0`,
    screen3_right_default: `https://afso.kma.go.kr/cgi/rdr/nph-rdr_cmp1_img?tm={T1}&cmp=HSP&qcd=HSLP&obs=ECHD&color=C4&aws=0&acc=0&map=HB&grid=2&legend=1&size=700&itv=5&zoom_level=1&zoom_x=4000000&zoom_y=2000000&gov=`,
    //레이더-위성영상
    screen4_left_default: `https://radar.kma.go.kr/cgi-bin/center/nph-rdr_cmp_img?tm={T1}&cmp=HSP&qcd=HSO&obs=ECHD&map=HC&size=800&xp=-9999&yp=-9999&zoom=1&wv=00&ht=1500&color=C4&topo=1&ZRa=&ZRb=&lat=&lon=&lonlat=0&x1=&y1=&x2=&y2=&center=0&typ=0&aws=01&wt=0`,
    screen4_right_default: `https://nmsc.kma.go.kr/IMG/GK2A/AMI/PRIMARY/L1B/COMPLETE/KO/{T12}/gk2a_ami_le1b_rgb-s-daynight_ko020lc_{T13}.png`,
    //레이더-수증기영상
    screen5_left_default: `https://radar.kma.go.kr/cgi-bin/center/nph-rdr_cmp_img?tm={T1}&cmp=HSP&qcd=HSO&obs=ECHD&map=HC&size=800&xp=-9999&yp=-9999&zoom=1&wv=00&ht=1500&color=C4&topo=1&ZRa=&ZRb=&lat=&lon=&lonlat=0&x1=&y1=&x2=&y2=&center=0&typ=0&aws=01&wt=0`,
    screen5_right_default: `https://nmsc.kma.go.kr/IMG/GK2A/AMI/PRIMARY/L1B/COMPLETE/KO/{T12}/gk2a_ami_le1b_enhc-wv069_ko020lc_{T13}.srv.png`,
    //레이더-바람벡터영상
    screen6_left_default: `https://radar.kma.go.kr/cgi-bin/tablet2/nph-rdr_cmp_img?tm={T1}&cmp=HSP&qcd=HSO&obs=ECHD&map=HC&size=800&xp=-9999&yp=-9999&zoom=2&wv=01&ht=800&color=C4&topo=1&ZRa=&ZRb=&lat=&lon=&lonlat=0&x1=&y1=&x2=&y2=&center=0&typ=0&aws=01&wt=0`,
    screen6_right_default: `https://radar.kma.go.kr/cgi-bin/tablet2/nph-rdr_cmp_img?tm={T1}&cmp=HSP&qcd=HSO&obs=ECHD&map=E&size=800&xp=330&yp=620&zoom=5&wv=01&ht=800&color=C4&topo=1&ZRa=&ZRb=&lat=&lon=&lonlat=0&x1=&y1=&x2=&y2=&center=0&typ=0&aws=01&wt=0`,
    //아시아/한반도 위성영상
    screen7_left_default: `https://nmsc.kma.go.kr/IMG/GK2A/AMI/PRIMARY/L1B/COMPLETE/EA/{T10}/gk2a_ami_le1b_rgb-s-daynight_ea020lc_{T11}.png`,
    screen7_right_default: `https://nmsc.kma.go.kr/IMG/GK2A/AMI/PRIMARY/L1B/COMPLETE/KO/{T12}/gk2a_ami_le1b_rgb-s-daynight_ko020lc_{T13}.png`,

    /* //항목 선택
    item1_left_default: "https://apihub.kma.go.kr/api/typ03/cgi/wrn/nph-wrn7?out=0&tmef=1&city=1&name=1&tm={T1}&lon=127&lat=37.59&range=70&size=330&wrn=W,R,C,D,O,V,T,S,Y,H,&authKey=DMoNuRIXSjSKDbkSF_o0qg",
    item2_left_default: "https://afso.kma.go.kr/cgi/aws3/nph-aws_min_img1?obs=rn_ex&tm={T1}&val=1&stn=1&obj=mq&map=HC&grid=2&legend=1&size=495.00&itv=5&zoom_level=2&zoom_x=3350000&zoom_y=5120000&gov=&_DT=RSW:RNEX",
    item3_left_default: "https://afso.kma.go.kr/cgi/aws3/nph-aws_min_img1?obs=rn_60m&tm={T1}&val=1&stn=1&obj=mq&map=HC&grid=2&legend=1&size=495.00&itv=60&zoom_level=2&zoom_x=3350000&zoom_y=5120000&gov=&_DT=RSW:RN60M",
    item4_left_default: "https://afso.kma.go.kr/cgi/aws3/nph-aws_min_img1?obs=rn_03h&tm={T1}&stn=1&obj=bn&map=HC&grid=2&legend=1&size=495.00&itv=5&zoom_level=2&zoom_x=3350000&zoom_y=5120000&gov=&_DT=RSW:RN03H",
    item5_left_default: "https://afso.kma.go.kr/cgi/aws3/nph-aws_min_img1?obs=rn_day&tm={T1}&val=1&stn=1&obj=mq&map=HC&grid=2&legend=1&size=495.00&itv=5&zoom_level=2&zoom_x=3350000&zoom_y=5120000&gov=&_DT=RSW:RNDAY1",
    item6_left_default: "https://afso.kma.go.kr/cgi/aws3/nph-aws_min_img1?obs=rn_acc&tm={T1}&tm_st={T5}&stn=1&obj=bn&map=HC&grid=2&legend=1&size=495.00&itv=5&zoom_level=2&zoom_x=3350000&zoom_y=5120000&gov=&_DT=RSW:RN02D",
    item7_left_default: "https://afso.kma.go.kr/cgi/aws3/nph-aws_min_img1?obs=rn_acc&tm={T1}&tm_st={T7}&stn=1&obj=bn&map=HC&grid=2&legend=1&size=495.00&itv=5&zoom_level=2&zoom_x=3350000&zoom_y=5120000&gov=&_DT=RSW:RN03D",
    item8_left_default: "https://afso.kma.go.kr/cgi/lgt/nph-lgt_dst_img?obs=lgt_dst&tm={T1}&val=1&stn=1&obj=bn&map=HC&grid=2&legend=1&size=495.00&itv=30&zoom_level=2&zoom_x=3350000&zoom_y=5120000&gov=&_DT=RSW:RDRLGT",
    item9_left_default: "https://afso.kma.go.kr/cgi/aws3/nph-aws_min_img1?obs=ta&tm={T1}&val=1&stn=1&obj=mq&map=HC&grid=2&legend=1&size=495.00&itv=5&zoom_level=2&zoom_x=3350000&zoom_y=5120000&gov=&_DT=RSW:TA",
    item10_left_default: "https://afso.kma.go.kr/cgi/aws3/nph-aws_min_img1?obs=vis&tm={T1}&val=1&stn=1&obj=bn&map=HC&grid=2&legend=1&size=495.00&itv=10&zoom_level=1&zoom_x=3350000&zoom_y=5120000&gov=&_DT=",
    */

    // 항목정보 두화면 변경시
    // 기본 화면
    weather0_left_default: `https://radar.kma.go.kr/cgi-bin/center/nph-rdr_cmp_img?tm={T1}&cmp=HSP&qcd=HSO&obs=ECHD&map=HC&size=800&xp=-9999&yp=-9999&zoom=1&wv=00&ht=1500&color=C4&topo=1&ZRa=&ZRb=&lat=&lon=&lonlat=0&x1=&y1=&x2=&y2=&center=0&typ=0&aws=01&wt=0`,
    weather0_right_default: `https://afso.kma.go.kr/cgi/rdr/nph-rdr_cmp1_img?tm={T1}&cmp=HSP&qcd=HSLP&obs=ECHD&color=C4&aws=0&acc=0&map=HC&grid=2&legend=1&size=700&itv=5&zoom_level=1&zoom_x=3350000&zoom_y=5120000&gov=`,
    // 특보 현황
    weather1_left_default: `https://apihub.kma.go.kr/api/typ03/cgi/wrn/nph-wrn7?out=0&tmef=1&city=1&name=1&tm={T1}&lon=127.7&lat=36.1&range=300&size=685&wrn=W,R,C,D,O,V,T,S,Y,H,&authKey=DMoNuRIXSjSKDbkSF_o0qg`,
    weather1_right_default: `https://apihub.kma.go.kr/api/typ03/cgi/wrn/nph-wrn7?out=0&tmef=1&city=1&name=1&tm={T1}&lon=127&lat=37.59&range=80&size=440&wrn=W,R,C,D,O,V,T,S,Y,H,&authKey=ERmgGaXgS5CZoBml4OuQVw`,
    // 예비 특보
    weather2_left_default: `https://apihub.kma.go.kr/api/typ03/cgi/wrn/nph-wrn7?out=0&tmef=1&city=1&name=1&tm={T1}&lon=127.7&lat=36.1&range=300&size=685&lv=1&wrn=W,R,C,D,O,V,T,S,Y,H,&authKey=DMoNuRIXSjSKDbkSF_o0qg`,
    weather2_right_default: `https://apihub.kma.go.kr/api/typ03/cgi/wrn/nph-wrn7?out=0&tmef=1&city=1&name=1&tm={T1}&lon=127&lat=37.59&range=80&size=440&lv=1&wrn=W,R,C,D,O,V,T,S,Y,H,&authKey=ERmgGaXgS5CZoBml4OuQVw`,
    // 강수 유무
    weather3_left_default: `https://afso.kma.go.kr/cgi/aws3/nph-aws_min_img1?obs=rn_ex&tm={T1}&val=1&stn=1&obj=mq&map=HB&grid=2&legend=1&size=495.00&itv=5&zoom_level=2&zoom_x=4000000&zoom_y=2000000&gov=&_DT=RSW:RNEX`,
    weather3_right_default: `https://afso.kma.go.kr/cgi/aws3/nph-aws_min_img1?obs=rn_ex&tm={T1}&val=1&stn=1&obj=mq&map=HC&grid=2&legend=1&size=495.00&itv=5&zoom_level=2&zoom_x=3350000&zoom_y=5120000&gov=&_DT=RSW:RNEX`,
    // 눈/비 영역
    weather4_left_default: `https://afso.kma.go.kr/cgi/rdr/nph-rdr_sfc_pty_img?tm={T1}&obs=RNSN&cmp=SFC&griddisp=0&rnexdisp=2&map=HB&grid=2&legend=1&size=495.00&itv=5&zoom_level=1&zoom_x=4000000&zoom_y=2000000&gov=&_DT=`,
    weather4_right_default: `https://afso.kma.go.kr/cgi/rdr/nph-rdr_sfc_pty_img?tm={T1}&obs=RNSN&cmp=SFC&griddisp=0&rnexdisp=2&map=HC&grid=2&legend=1&size=495.00&itv=5&zoom_level=1&zoom_x=3350000&zoom_y=5120000&gov=&_DT=`,
    // 어는 비 가능성
    weather5_left_default: `https://afso.kma.go.kr/cgi/aws3/nph-aws_min_img1?obs=frg&tm={T1}&val=1&stn=1&obj=mq&map=HB&grid=2&legend=1&size=495.00&itv=5&zoom_level=2&zoom_x=4000000&zoom_y=2000000&gov=&_DT=`,
    weather5_right_default: `https://afso.kma.go.kr/cgi/aws3/nph-aws_min_img1?obs=frg&tm={T1}&val=1&stn=1&obj=mq&map=HC&grid=2&legend=1&size=495.00&itv=5&zoom_level=2&zoom_x=3350000&zoom_y=5120000&gov=&_DT=`,
    // 누적강수량(1H)    
    weather6_left_default: `https://afso.kma.go.kr/cgi/aws3/nph-aws_min_img1?obs=rn_60m&tm={T1}&val=1&stn=1&obj=mq&map=HB&grid=2&legend=1&size=495.00&itv=60&zoom_level=2&zoom_x=4000000&zoom_y=2000000&gov=&_DT=RSW:RN60M`,
    weather6_right_default: `https://afso.kma.go.kr/cgi/aws3/nph-aws_min_img1?obs=rn_60m&tm={T1}&val=1&stn=1&obj=mq&map=HC&grid=2&legend=1&size=495.00&itv=60&zoom_level=2&zoom_x=3350000&zoom_y=5120000&gov=&_DT=RSW:RN60M`,
    // 누적강수량(3H)
    weather7_left_default: `https://afso.kma.go.kr/cgi/aws3/nph-aws_min_img1?obs=rn_03h&tm={T1}&stn=1&obj=bn&map=HB&grid=2&legend=1&size=495.00&itv=5&zoom_level=2&zoom_x=4000000&zoom_y=2000000&gov=&_DT=RSW:RN03H`,
    weather7_right_default: `https://afso.kma.go.kr/cgi/aws3/nph-aws_min_img1?obs=rn_03h&tm={T1}&stn=1&obj=bn&map=HC&grid=2&legend=1&size=495.00&itv=5&zoom_level=2&zoom_x=3350000&zoom_y=5120000&gov=&_DT=RSW:RN03H`,
    // 일 강수량
    weather8_left_default: `https://afso.kma.go.kr/cgi/aws3/nph-aws_min_img1?obs=rn_day&tm={T1}&val=1&stn=1&obj=mq&map=HB&grid=2&legend=1&size=495.00&itv=5&zoom_level=2&zoom_x=4000000&zoom_y=2000000&gov=&_DT=RSW:RNDAY1`,
    weather8_right_default: `https://afso.kma.go.kr/cgi/aws3/nph-aws_min_img1?obs=rn_day&tm={T1}&val=1&stn=1&obj=mq&map=HC&grid=2&legend=1&size=495.00&itv=5&zoom_level=2&zoom_x=3350000&zoom_y=5120000&gov=&_DT=RSW:RNDAY1`,
    // 2일 강수량
    weather9_left_default: `https://afso.kma.go.kr/cgi/aws3/nph-aws_min_img1?obs=rn_acc&tm={T1}&tm_st={T5}&stn=1&obj=bn&map=HB&grid=2&legend=1&size=495.00&itv=5&zoom_level=2&zoom_x=4000000&zoom_y=2000000&gov=&_DT=RSW:RN02D`,
    weather9_right_default: `https://afso.kma.go.kr/cgi/aws3/nph-aws_min_img1?obs=rn_acc&tm={T1}&tm_st={T5}&stn=1&obj=bn&map=HC&grid=2&legend=1&size=495.00&itv=5&zoom_level=2&zoom_x=3350000&zoom_y=5120000&gov=&_DT=RSW:RN02D`,
    // 3일 강수량
    weather10_left_default: `https://afso.kma.go.kr/cgi/aws3/nph-aws_min_img1?obs=rn_acc&tm={T1}&tm_st={T7}&stn=1&obj=bn&map=HB&grid=2&legend=1&size=495.00&itv=5&zoom_level=2&zoom_x=4000000&zoom_y=2000000&gov=&_DT=RSW:RN03D`,
    weather10_right_default: `https://afso.kma.go.kr/cgi/aws3/nph-aws_min_img1?obs=rn_acc&tm={T1}&tm_st={T7}&stn=1&obj=bn&map=HC&grid=2&legend=1&size=495.00&itv=5&zoom_level=2&zoom_x=3350000&zoom_y=5120000&gov=&_DT=RSW:RN03D`,
    // 신적설(3H)
    weather11_left_default: `https://afso.kma.go.kr/cgi/aws3/nph-aws_min_img1?obs=sd_3hr&tm={T1}&val=1&stn=1&obj=bn&map=HB&grid=2&legend=1&size=495.00&itv=5&zoom_level=1&zoom_x=4000000&zoom_y=2000000&gov=&_DT=RSW:SD3HR`,
    weather11_right_default: `https://afso.kma.go.kr/cgi/aws3/nph-aws_min_img1?obs=sd_3hr&tm={T1}&val=1&stn=1&obj=bn&map=HC&grid=2&legend=1&size=495.00&itv=5&zoom_level=1&zoom_x=3350000&zoom_y=5120000&gov=&_DT=RSW:SD3HR`,
    // 신적설(24H)
    weather12_left_default: `https://afso.kma.go.kr/cgi/aws3/nph-aws_min_img1?obs=sd_24h&tm={T1}&val=1&stn=1&obj=bn&map=HB&grid=2&legend=1&size=495.00&itv=5&zoom_level=1&zoom_x=4000000&zoom_y=2000000&gov=&_DT=RSW:SD24H`,
    weather12_right_default: `https://afso.kma.go.kr/cgi/aws3/nph-aws_min_img1?obs=sd_24h&tm={T1}&val=1&stn=1&obj=bn&map=HC&grid=2&legend=1&size=495.00&itv=5&zoom_level=1&zoom_x=3350000&zoom_y=5120000&gov=&_DT=RSW:SD24H`,
    // 적설량
    weather13_left_default: `https://afso.kma.go.kr/cgi/aws3/nph-aws_min_img1?obs=sd_tot&tm={T1}&val=1&stn=1&obj=bn&map=HB&grid=2&legend=1&size=495.00&itv=5&zoom_level=1&zoom_x=4000000&zoom_y=2000000&gov=&_DT=RSW:SDTOT`,
    weather13_right_default: `https://afso.kma.go.kr/cgi/aws3/nph-aws_min_img1?obs=sd_tot&tm={T1}&val=1&stn=1&obj=bn&map=HC&grid=2&legend=1&size=495.00&itv=5&zoom_level=1&zoom_x=3350000&zoom_y=5120000&gov=&_DT=RSW:SDTOT`,
    // 낙뢰 영상
    weather14_left_default: `https://afso.kma.go.kr/cgi/lgt/nph-lgt_dst_img?obs=lgt_dst&tm={T1}&val=1&stn=1&obj=bn&map=HB&grid=2&legend=1&size=495.00&itv=30&zoom_level=2&zoom_x=4000000&zoom_y=2000000&gov=&_DT=RSW:RDRLGT`,
    weather14_right_default: `https://afso.kma.go.kr/cgi/lgt/nph-lgt_dst_img?obs=lgt_dst&tm={T1}&val=1&stn=1&obj=bn&map=HC&grid=2&legend=1&size=495.00&itv=30&zoom_level=2&zoom_x=3350000&zoom_y=5120000&gov=&_DT=RSW:RDRLGT`,
    // 현재 기온
    weather15_left_default: `https://afso.kma.go.kr/cgi/aws3/nph-aws_min_img1?obs=ta&tm={T1}&val=1&stn=1&obj=mq&map=HB&grid=2&legend=1&size=495.00&itv=5&zoom_level=2&zoom_x=4000000&zoom_y=2000000&gov=&_DT=RSW:TA`,
    weather15_right_default: `https://afso.kma.go.kr/cgi/aws3/nph-aws_min_img1?obs=ta&tm={T1}&val=1&stn=1&obj=mq&map=HC&grid=2&legend=1&size=495.00&itv=5&zoom_level=2&zoom_x=3350000&zoom_y=5120000&gov=&_DT=RSW:TA`,
    // 체감 온도
    weather16_left_default: `https://afso.kma.go.kr/cgi/aws3/nph-aws_min_img1?obs=ta_chi&tm={T1}&val=1&stn=1&obj=mq&map=HB&grid=2&legend=1&size=495.00&itv=5&zoom_level=1&zoom_x=4000000&zoom_y=2000000&gov=&_DT=RSW:TACHI`,
    weather16_right_default: `https://afso.kma.go.kr/cgi/aws3/nph-aws_min_img1?obs=ta_chi&tm={T1}&val=1&stn=1&obj=mq&map=HC&grid=2&legend=1&size=495.00&itv=5&zoom_level=1&zoom_x=3350000&zoom_y=5120000&gov=&_DT=RSW:TACHI`,
    // 기온차(오늘-어제)
    weather17_left_default: `https://afso.kma.go.kr/cgi/aws3/nph-aws_min_img1?obs=ta_dif&tm={T1}&val=1&stn=1&obj=mq&map=HB&grid=2&legend=1&size=495.00&itv=5&zoom_level=1&zoom_x=4000000&zoom_y=2000000&gov=&_DT=RSW:TADIF`,
    weather17_right_default: `https://afso.kma.go.kr/cgi/aws3/nph-aws_min_img1?obs=ta_dif&tm={T1}&val=1&stn=1&obj=mq&map=HC&grid=2&legend=1&size=495.00&itv=5&zoom_level=1&zoom_x=3350000&zoom_y=5120000&gov=&_DT=RSW:TADIF`,
    // 지상 시정
    weather18_left_default: `https://afso.kma.go.kr/cgi/aws3/nph-aws_min_img1?obs=vis&tm={T1}&val=1&stn=1&obj=bn&map=HB&grid=2&legend=1&size=495.00&itv=10&zoom_level=1&zoom_x=4000000&zoom_y=2000000&gov=&_DT=`,
    weather18_right_default: `https://afso.kma.go.kr/cgi/aws3/nph-aws_min_img1?obs=vis&tm={T1}&val=1&stn=1&obj=bn&map=HC&grid=2&legend=1&size=495.00&itv=10&zoom_level=1&zoom_x=3350000&zoom_y=5120000&gov=&_DT=`,
    // 평균 풍속(10Min)
    weather19_left_default: `https://afso.kma.go.kr/cgi/aws3/nph-aws_min_img1?obs=ws_10m&tm={T1}&val=1&stn=1&obj=mq&ws_ms=ms&map=HB&grid=2&legend=1&size=495.00&itv=10&zoom_level=1&zoom_x=4000000&zoom_y=2000000&gov=&_DT=RSW:WS10M`,
    weather19_right_default: `https://afso.kma.go.kr/cgi/aws3/nph-aws_min_img1?obs=ws_10m&tm={T1}&val=1&stn=1&obj=mq&ws_ms=ms&map=HC&grid=2&legend=1&size=495.00&itv=10&zoom_level=1&zoom_x=3350000&zoom_y=5120000&gov=&_DT=RSW:WS10M`,
    // 순간 풍속(1Min)
    weather20_left_default: `https://afso.kma.go.kr/cgi/aws3/nph-aws_min_img1?obs=ws_ins&tm={T1}&val=1&stn=1&obj=mq&ws_ms=ms&map=HB&grid=2&legend=1&size=495.00&itv=5&zoom_level=2&zoom_x=4000000&zoom_y=2000000&gov=&_DT=`,
    weather20_right_default: `https://afso.kma.go.kr/cgi/aws3/nph-aws_min_img1?obs=ws_ins&tm={T1}&val=1&stn=1&obj=mq&ws_ms=ms&map=HC&grid=2&legend=1&size=495.00&itv=5&zoom_level=2&zoom_x=3350000&zoom_y=5120000&gov=&_DT=`,
    // 운저/운량    
    weather21_left_default: `https://afso.kma.go.kr/php/alw//aws/aws_obs_pnt.php?obs=ch&tm={T1}&val=1&stn=1&obj=mq&map=HC&grid=2&legend=1&size=495.00&itv=10&zoom_level=1&zoom_x=3350000&zoom_y=5120000&gov=&_DT=RSW:CH`,
    weather21_right_default: `https://afso.kma.go.kr/cgi/aws3/nph-aws_min_img1?obs=ca&tm={T1}&val=1&stn=1&obj=mq&map=HC&grid=2&legend=1&size=495.00&itv=10&zoom_level=1&zoom_x=3350000&zoom_y=5120000&gov=&_DT=RSW:CA`,    
    // 레이더 수상체    
    weather22_left_default: `https://afso.kma.go.kr/cgi/rdr/nph-rdr_cmp1_img?tm={T1}&cmp=HCI2&qcd=EXT&obs=ECHO&color=C4&aws=0&acc=&map=HB&grid=2&legend=1&size=495.00&itv=5&zoom_level=2&zoom_x=4000000&zoom_y=2000000&gov=&_DT=`,
    weather22_right_default: `https://afso.kma.go.kr/cgi/rdr/nph-rdr_cmp1_img?tm={T1}&cmp=HCI2&qcd=EXT&obs=ECHO&color=C4&aws=0&acc=&map=HC&grid=2&legend=1&size=495.00&itv=5&zoom_level=2&zoom_x=3350000&zoom_y=5120000&gov=&_DT=`,    
    // 레이더 우박 
    weather23_left_default: `https://afso.kma.go.kr/cgi/rdr/nph-rdr_cmp1_img?tm={T1}&cmp=HAIL&qcd=EXT&obs=ECHO&color=C4&aws=0&acc=&map=HB&grid=2&legend=1&size=495.00&itv=5&zoom_level=2&zoom_x=4000000&zoom_y=2000000&gov=&_DT=`,
    weather23_right_default: `https://afso.kma.go.kr/cgi/rdr/nph-rdr_cmp1_img?tm={T1}&cmp=HAIL&qcd=EXT&obs=ECHO&color=C4&aws=0&acc=&map=HC&grid=2&legend=1&size=495.00&itv=5&zoom_level=2&zoom_x=3350000&zoom_y=5120000&gov=&_DT=`,    
    // 신적설(일)
    weather24_left_default: `https://afso.kma.go.kr/cgi/aws3/nph-aws_min_img1?obs=sd_day&tm={T1}&val=1&stn=1&obj=bn&map=HB&grid=2&legend=1&size=495.00&itv=5&zoom_level=2&zoom_x=4000000&zoom_y=2000000&gov=&_DT=RSW:SDDAY`,
    weather24_right_default: `https://afso.kma.go.kr/cgi/aws3/nph-aws_min_img1?obs=sd_day&tm={T1}&val=1&stn=1&obj=bn&map=HC&grid=2&legend=1&size=495.00&itv=5&zoom_level=2&zoom_x=3350000&zoom_y=5120000&gov=&_DT=RSW:SDDAY`,    
    // 도로살얼음 상태
    weather25_left_default: `https://afso.kma.go.kr/cgi/road/nph-road_aws3_min_img1?obs=road_fzrp&tm={T1}&val=1&stn=1&obj=mq3d&disp=1&grid=1&legend=1&map=HB&size=495&itv=5&unit=&city=0&zoom_level=3&zoom_x=4000000&zoom_y=2000000&gov=`,
    weather25_right_default: `https://afso.kma.go.kr/cgi/road/nph-road_aws3_min_img1?obs=road_fzrp&tm={T1}&val=1&stn=1&obj=mq3d&disp=1&grid=1&legend=1&map=HC&size=495&itv=5&unit=&city=0&zoom_level=3&zoom_x=3350000&zoom_y=5120000&gov=`,    
    // 노면상태
    weather26_left_default: `https://afso.kma.go.kr/cgi/road/nph-road_aws3_min_img1?obs=sfs&tm={T1}&val=1&stn=3&obj=mq3d&grid=1&legend=1&map=HB&size=495&itv=5&unit=&city=0&zoom_level=0&zoom_x=4000000&zoom_y=2000000&gov=`,
    weather26_right_default: `https://afso.kma.go.kr/cgi/road/nph-road_aws3_min_img1?obs=sfs&tm={T1}&val=1&stn=3&obj=mq3d&grid=1&legend=1&map=HC&size=495&itv=5&unit=&city=1&zoom_level=3&zoom_x=3350000&zoom_y=5120000&gov=`,    
    // 습구온도(1.2)
    weather27_left_default: `https://afso.kma.go.kr/cgi/aws3/nph-aws_min_img1?obs=tw_win&tm={T1}&val=1&stn=1&obj=mq&map=HB&grid=2&legend=1&size=495&itv=5&zoom_level=2&zoom_x=4000000&zoom_y=2000000&gov=&_DT=`,
    weather27_right_default: `https://afso.kma.go.kr/cgi/aws3/nph-aws_min_img1?obs=tw_win&tm={T1}&val=1&stn=1&obj=mq&map=HC&grid=2&legend=1&size=495&itv=5&zoom_level=2&zoom_x=3350000&zoom_y=5120000&gov=&_DT=`,    
    // 월 기온 예측(JMA)
    weather28_left_default: `https://www.data.jma.go.jp/gmd/risk/probability/figure/z500_k1.png`,
    weather28_right_default: `https://www.data.jma.go.jp/gmd/risk/probability/figure/t850_k1.png`,    

    //태풍항목
    //태풍현황(1)
    TYPHOON1_left_default: `https://www.weather.go.kr/w/repositary/image/typ/sat/bt6_{T2}.png`,
    TYPHOON1_right_default: generateT1Url(),
    //태풍예측(1)
    TYPHOON2_left_default: `https://www.weather.go.kr/w/repositary/image/typ/cht/typh_muti_prob_pb4_middl_24${TYPHOON1_SEQ}_{T8}.gif`,
    TYPHOON2_right_default: `https://www.typhoon2000.ph/multi/data/${TYPHOON1_NAME}.PNG`,

    //태풍현황(2)
    TYPHOON3_left_default: `https://www.weather.go.kr/w/repositary/image/typ/sat/bt6_{T2}.png`,
    TYPHOON3_right_default: generateT2Url(),
    //태풍예측(2)
    TYPHOON4_left_default: `https://www.weather.go.kr/w/repositary/image/typ/cht/typh_muti_prob_pb4_middl_24${TYPHOON2_SEQ}_{T8}.gif`,
    TYPHOON4_right_default: `https://www.typhoon2000.ph/multi/data/${TYPHOON2_NAME}.PNG`,

    //태풍현황(3)
    TYPHOON5_left_default: `https://www.weather.go.kr/w/repositary/image/typ/sat/bt6_{T2}.png`,
    TYPHOON5_right_default: generateT3Url(),
    //태풍예측(3)
    TYPHOON6_left_default: `https://www.weather.go.kr/w/repositary/image/typ/cht/typh_muti_prob_pb4_middl_24${TYPHOON3_SEQ}_{T8}.gif`,
    TYPHOON6_right_default: `https://www.typhoon2000.ph/multi/data/${TYPHOON3_NAME}.PNG`,

    //태풍현황(4)
    TYPHOON7_left_default: `https://www.weather.go.kr/w/repositary/image/typ/sat/bt6_{T2}.png`,
    TYPHOON7_right_default: generateT4Url(),
    //태풍예측(4)
    TYPHOON8_left_default: `https://www.weather.go.kr/w/repositary/image/typ/cht/typh_muti_prob_pb4_middl_24${TYPHOON4_SEQ}_{T8}.gif`,
    TYPHOON8_right_default: `https://www.typhoon2000.ph/multi/data/${TYPHOON4_NAME}.PNG`,

    //모델 예측
    TYPHOON9_left_default: `./23W_gefs_latest.png`,
    TYPHOON9_right_default: `./23W_geps_latest.png`,

    //일기도
    TYPHOON10_left_default: "https://www.weather.go.kr/w/repositary/image/cht/img/kim_surf_newsur_pa4_{T8}.gif",
    TYPHOON10_right_default: "https://www.weather.go.kr/w/repositary/image/cht/img/kor1_anlmod_pb4_{T9}.gif",

    //태풍 감시
    TYPHOON11_left_default: `https://www.weather.go.kr/w/repositary/image/typ/monitor/kim_typh_fcst_wnd850_ft06_pa4_s000_{T8}.gif`,
    TYPHOON11_right_default: `https://www.weather.go.kr/w/repositary/image/typ/monitor/kim_typh_fcst_wndshr_ft06_pa4_s000_{T8}.gif`,
    
    //해수면 온도    
    TYPHOON12_left_default: "https://data.kma.go.kr/CHT/EXTJ/{T6}/usst_rdps_anal_{T5}.gif",
    TYPHOON12_right_default: "https://data.kma.go.kr/CHT/EXTJ/{T6}/usst_korea_anal_{T5}.gif",
    
    //E N S O
    TYPHOON13_left_default: `https://www.weather.go.kr/w/repositary/xml/fct/mon/img/gmap_eli1_20241122.png`,
    TYPHOON13_right_default: `https://www.weather.go.kr/w/repositary/xml/fct/mon/img/nino34_img_20241122.png`,

    //Blocking, AO INDEX
    TYPHOON14_left_default: `https://www.cpc.ncep.noaa.gov/products/precip/CWlink/blocking/real_time_nh/forecast_1_nh.gif`,
    TYPHOON14_right_default: `https://www.cpc.ncep.noaa.gov/products/precip/CWlink/daily_ao_index/ao.gefs.sprd2.png`,


    // 초단기 예측
    fore1_left_default: `https://afso.kma.go.kr/cgi/dfs/nph-qpf_ana_img?eva=1&tm={T20}&qpf=B&ef={EF}&map=HB&grid=2&legend=1&size=450&itv=&zoom_level=1&zoom_x=4000000&zoom_y=2000000&stn=108&x1=470&y1=575`,
    fore1_right_default: `https://afso.kma.go.kr/cgi/dfs/nph-qpf_ana_img?eva=1&tm={T20}&qpf=B&ef={EF}&map=HC&grid=2&legend=1&size=450&itv=&zoom_level=1&zoom_x=3350000&zoom_y=5120000&stn=108&x1=470&y1=575`,
    // 계절 예측
    fore6_left_default: `https://www.apcc21.org/apcc_images/MME_FIG/MME_OUT/3-MON/FORECAST/GAUS/2024/12/Seasonal/DJF/East_asia/t2m.png`,
    fore6_right_default: `https://www.apcc21.org/apcc_images/MME_FIG/MME_OUT/3-MON/FORECAST/GAUS/2024/12/Seasonal/DJF/East_asia/prec.png`,
    // 동네 예보 test
    fore7_left_default: `https://afso.kma.go.kr/cgi/dfs/nph-dfs_shrt_ana_5d_test?data0=GEMD&data1=R06&tm_ef=202411230900&tm_fc=202411230800&dtm=H0&map=G1&mask=M&color=E&size=450&effect=NTL&overlay=S&zoom_rate=2&zoom_level=0&zoom_x=0000000&zoom_y=0000000&move=1&auto_man=m&mode=I&interval=1`,
    fore7_right_default: `https://afso.kma.go.kr/cgi/dfs/nph-dfs_shrt_ana_5d_test?data0=GEMD&data1=R06&tm_ef=202411230900&tm_fc=202411230800&dtm=H0&map=D1&mask=M&color=E&size=450&effect=NTL&overlay=S&zoom_rate=2&zoom_level=0&zoom_x=3400000&zoom_y=8900000&move=1&auto_man=m&mode=I&interval=1`,
};

$(document).ready(function () {

    // let $ef = $('#select-ef');
    // for (let i = 30; i <= 720; i += 30) {
    //     $ef.append(`<option value="${i}">${i}</option>`);
    // }

    // $('#select-ef').on('change', function () {
    //     let selOpt = $(this).find('option:selected');
    //     let selVal = selOpt.val();
    //     $('#select-ef').val(`${selVal}`);
    //
    //     updateImages(currentTime);
    // });

    $('#select-fore').on('click', function () {
        let selOpt = $(this).find('option:selected');
        let selVal = selOpt.val();

        // 초단기 예측 메뉴 선택 시 초기화
        if (selVal === "fore1") {
            // currentTime = moment().toDate();
            selectedTime = moment().toDate();
            $("#currentTime").text(moment(selectedTime).format("YYYY-MM-DD HH:mm"));
            $("#datePicker").val(moment(selectedTime).format("YYYY-MM-DDTHH:mm"));
            $("#timeSlider-fore-ef").val(30);
        }

        $('#select-fore').val(`${selVal}`);

        changeScreen(selVal);
    });
});

//화면 1~6 클릭시 기본화면으로 리셋
function changeScreen(screenIndex) {
    currentScreenIndex = screenIndex;
    updateSlider();

}

function screen(left, right) {
    $screenLeft.src = left;
    $screenRight.src = right;
}

/**
 * format
 * 0: 2024-09-30 20:35
 * 1: 202409302035
 * 2: 202409/08/23
 *
 * @param {*} date
 * @param {*} format
 * @returns
 */
function changeDateFormat(date, format = 0) {
    const now = date ? new Date(date) : new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    if (format === 0) return `${year}-${month}-${day} ${hours}:${minutes}`;
    if (format === 1) return `${year}${month}${day}${hours}${minutes}`;
    if (format === 2) return `${year}${month}/${day}/${hours}`;
    if (format === 3) return `${year}${month}${day}${hours}`;
    if (format === 4) return `${year}${month}/${day}`;
}

//현재까지 선택된 시간 데이터 기준으로 슬라이드/시간/이미지 업데이트
function updateSlider(selectedTimeOverride, type = "change") {
    const slider = $timeSlider;
    const currentTimeDisplay = document.getElementById("currentTime");
    const sliderValue = parseFloat(slider.value);
    const hoursDiff = 48 - sliderValue;

    const timeToUse = selectedTimeOverride || selectedTime || currentTime;
    const displayTime = new Date(timeToUse.getTime() - hoursDiff * 60 * 60000);
    currentTimeDisplay.textContent = changeDateFormat(displayTime);

    // 불필요한 리소스 낭비를 방지하기 위해 change 이벤트 발생시에만 이미지 업데이트
    if (type === "change") {
        updateImages(displayTime);
    }
}

/**
 * 이미지 URL 생성기
 */
function generateImageURL(time, url) {
    let now = new Date();

    //매시 5분 단위
    if (url.includes("{T1}")) {
        url = url.replaceAll("{T1}", changeDateFormat(time, 1));
    }

    //매시 UTC 10분 단위 20분 딜레이
    if (url.includes("{T10}") || url.includes("{T11}")) {
        const DELAY = 10;
        now = new Date(now - UTC_TIME);
        time = new Date(time - UTC_TIME);

        time.setMinutes(Math.floor(time.getMinutes() / 10) * 10);
        if (now - time < DELAY * 60 * 1000) time.setMinutes(time.getMinutes() - 10);
        url = url.replaceAll("{T10}", changeDateFormat(time, 2));
        url = url.replaceAll("{T11}", changeDateFormat(time, 1));
    }

    //매시 UTC 10분 단위 3분 딜레이
    if (url.includes("{T12}") || url.includes("{T13}")) {
        const DELAY = 3;
        now = new Date(now - UTC_TIME);
        time = new Date(time - UTC_TIME);

        time.setMinutes(Math.floor(time.getMinutes() / 10) * 10);
        if (now - time < DELAY * 60 * 1000) time.setMinutes(time.getMinutes() - 10);
        url = url.replaceAll("{T12}", changeDateFormat(time, 2));
        url = url.replaceAll("{T13}", changeDateFormat(time, 1));
    }

    //9시간 이전 "50분"
    if (url.includes("{T2}") || url.includes("{T3}")) {
        //이미지 생성까지 딜레이 시간 보정
        const DELAY = 22;
        now = new Date(now - UTC_TIME);
        time = new Date(time - UTC_TIME);

        const minutes = time.getMinutes();

        const flooredHour = minutes >= 50 ? time.getHours() : time.getHours() - 1;
        const flooredMinutesFinal = 50;

        time.setHours(flooredHour);
        time.setMinutes(flooredMinutesFinal);
        time.setSeconds(0);

        if (now - time < DELAY * 60 * 1000) time.setHours(time.getHours() - 1);

        url = url.replaceAll("{T2}", changeDateFormat(time, 1));
        url = url.replaceAll("{T3}", changeDateFormat(time, 2));
    }

    //14시 이전 00시
    if (url.includes("{T4}")) {
        now = new Date(now - 14 * 60 * 60 * 1000);
        time = new Date(time - 14 * 60 * 60 * 1000);

        time.setHours(0);
        time.setMinutes(0);
        time.setSeconds(0);

        url = url.replaceAll("{T4}", changeDateFormat(time, 3));
    }

    //전일 00시
    if (url.includes("{T5}" || "{T6}")) {
        time = new Date(time - 1 * 24 * 60 * 60 * 1000);

        time.setHours(0);
        time.setMinutes(0);
        time.setSeconds(0);

        url = url.replaceAll("{T5}", changeDateFormat(time, 3));
        url = url.replaceAll("{T6}", changeDateFormat(time, 4));
    }

    //2일전 00시
    if (url.includes("{T7}")) {
        time = new Date(time - 2 * 24 * 60 * 60 * 1000);

        time.setHours(0);
        time.setMinutes(0);
        time.setSeconds(0);

        url = url.replaceAll("{T7}", changeDateFormat(time, 3));
    }

    //6시간 단위
    if (url.includes("{T8}")) {
        time = new Date(new Date(time) - 15 * 60 * 60 * 1000);

        time.setHours(Math.floor(time.getHours() / 6) * 6);

        url = url.replaceAll("{T8}", changeDateFormat(time, 3));
    }

    if (url.includes("{T9}")) {
        const DELAY = 20;
        const current = new Date(new Date() - UTC_TIME);
        time = new Date(new Date(time) - UTC_TIME);

        // 이미지 생성시간 고려 10분이 안되었으면 1시간 전  00시 이미지로 대신 노출
        console.log("🚀 ~ generateImageURL ~ current.getMinutes():", current.getMinutes());
        if (current.getMinutes() < DELAY) time.setHours(time.getHours() - 1);

        url = url.replaceAll("{T9}", changeDateFormat(time, 3));
    }

    if (url.includes("{T20}")) {
        let preDate = moment(time);
        let diffByMinute = moment(now).diff(moment(time), 'minutes');
        // console.log(`time : ${moment(time).format('YYYY-MM-DD HH:mm')}`);
        // console.log(`now : ${moment(now).format('YYYY-MM-DD HH:mm')}`);

        // 준실시간 (10분 이내)인 경우 (현재 시간 - 10분) 내 10분 단위
        // 그 외 (특정 시간 - 0분) 내 10분 단위
        let forDate = moment(preDate).subtract(diffByMinute <= 10 ? 10 : 0, 'minutes');
        forDate.minute(Math.floor(forDate.minute() / 10) * 10);
        console.log(`forDate: ${forDate.format('YYYY-MM-DD HH:mm')}`);

        url = url.replaceAll("{T20}", forDate.format('YYYYMMDDHHmm'));
        // url = url.replaceAll("{EF}", $("#select-ef").val());
        url = url.replaceAll("{EF}", $("#timeSlider-fore-ef").val());
    }


    return url;
}


// 업데이트 버튼
function toggleAutoUpdate() {
    const autoUpdateCheckbox = document.getElementById("autoUpdateCheckbox");
    if (autoUpdateCheckbox.checked) {
        startAutoUpdate();
        showNextUpdateDisplay();
    } else {
        stopAutoUpdate();
        hideNextUpdateDisplay();
    }
}

// 재생 버튼
function togglePlay() {
    const playButton = document.getElementById("playButton");
    const slider = document.getElementById("timeSlider");
    if (isPlaying) {
        clearInterval(playInterval);
        playButton.textContent = "재생";
    } else {
        playStartValue = parseFloat(slider.value);
        playInterval = setInterval(() => {
            if (slider.value < 48) {
                slider.value = parseFloat(slider.value) + 1.0;
            } else {
                if (document.getElementById("repeatCheckbox").checked) {
                    slider.value = playStartValue;
                } else {
                    clearInterval(playInterval);
                    playButton.textContent = "재생";
                    isPlaying = false;
                    return;
                }
            }
            updateSlider();
        }, 2000);
        playButton.textContent = "정지";
    }
    isPlaying = !isPlaying;
}


function getNextUpdateTime() {
    const now = new Date();
    const minutes = Math.floor(now.getMinutes() / 5) * 5;
    const nextUpdate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), minutes, 0, 0);
    nextUpdate.setMinutes(nextUpdate.getMinutes() + 4);
    nextUpdate.setSeconds(10);
    if (nextUpdate <= now) {
        nextUpdate.setMinutes(nextUpdate.getMinutes() + 5);
    }
    return nextUpdate;
}

function startAutoUpdate() {
    function scheduleNextUpdate() {
        const now = new Date();
        const nextUpdate = getNextUpdateTime();
        const timeUntilUpdate = nextUpdate.getTime() - now.getTime();

        console.log(`Next update scheduled at: ${nextUpdate.toLocaleString()}`);

        autoUpdateInterval = setTimeout(() => {
            setLatestTime();
            updateImages(currentTime);
            scheduleNextUpdate();
        }, timeUntilUpdate);
    }

    scheduleNextUpdate();
}

function showNextUpdateDisplay() {
    function updateNextUpdateDisplay() {
        const nextUpdate = changeDateFormat(getNextUpdateTime());

        const nextUpdateDisplay = document.getElementById("nextUpdateDisplay");
        if (nextUpdateDisplay) {
            nextUpdateDisplay.textContent = `NEXT : ${nextUpdate}`;
            nextUpdateDisplay.style.display = "block";
        }
    }

    updateNextUpdateDisplay();
    nextUpdateDisplayInterval = setInterval(updateNextUpdateDisplay, 1000);
}

function hideNextUpdateDisplay() {
    const nextUpdateDisplay = document.getElementById("nextUpdateDisplay");
    if (nextUpdateDisplay) {
        nextUpdateDisplay.style.display = "none";
    }
    clearInterval(nextUpdateDisplayInterval);
}

function stopAutoUpdate() {
    clearTimeout(autoUpdateInterval);
}


// 현재 시간 버튼

function setLatestTime() {
    const now = new Date();
    currentTime = new Date(now);
    currentTime.setMinutes(Math.floor(currentTime.getMinutes() / 5) * 5);
    currentTime.setSeconds(0);
    currentTime.setMilliseconds(0);

    selectedTime = new Date(currentTime);

    $datePicker.value = changeDateFormat();
    $timeSlider.value = 48;
    updateSlider();
}

// 현재 시간 버튼

function adjustTime(hours) {
    if (currentScreenIndex === "fore1") {
        let $timeSliderForeEf = $("#timeSlider-fore-ef");
        let orgVal = parseFloat($timeSliderForeEf.val());
        let offset = parseFloat(hours * 60);
        let newValue = orgVal + offset;

        if (newValue < 30) newValue = 30;
        if (newValue > 720) newValue = 720;

        $timeSliderForeEf.val(newValue)
    } else {
        const slider = $timeSlider;
        let newValue = parseFloat(slider.value) + hours;
        newValue = Math.max(0, Math.min(48, newValue));
        slider.value = newValue;
    }

     updateSlider();
}

//전달된 시간 기준으로 이미지 정보 업데이트
function updateImages(time) {

    // debugger;
    // 화면 버튼(레이더, 위성) 이미지 업데이트
    if (currentScreenIndex === 1 || currentScreenIndex === 2 || currentScreenIndex === 3 || currentScreenIndex === 4 || currentScreenIndex === 5 || currentScreenIndex === 6 || currentScreenIndex === 7) {
        document.querySelector("#items").options[0].selected = true;
        document.querySelector("#typhoons").options[0].selected = true;
        console.log("sc", currentScreenIndex);
        screen(generateImageURL(time, baseImages[`screen${currentScreenIndex}_left_default`]), generateImageURL(time, baseImages[`screen${currentScreenIndex}_right_default`]));
        currentRightSrc = baseImages[`screen${currentScreenIndex}_right_default`];
    }

    // 태풍 정보 이미지 업데이트
    if (currentScreenIndex === "TP1" || currentScreenIndex === "TP2" || currentScreenIndex === "TP3" || currentScreenIndex === "TP4" || currentScreenIndex === "TP5" || currentScreenIndex === "TP6" || currentScreenIndex === "TP7"|| currentScreenIndex === "TP8"|| currentScreenIndex === "TP9"|| currentScreenIndex === "TP10"|| currentScreenIndex === "TP11"|| currentScreenIndex === "TP12"|| currentScreenIndex === "TP13"|| currentScreenIndex === "TP14") {
        document.querySelector("#items").options[0].selected = true;
        console.log("tp", currentScreenIndex);

        screen(generateImageURL(time, baseImages[`TYPHOON${currentScreenIndex.substr(2)}_left_default`]), generateImageURL(time, baseImages[`TYPHOON${currentScreenIndex.substr(2)}_right_default`]));
        currentRightSrc = baseImages[`TYPHOON${currentScreenIndex.substr(2)}_right_default`];
    }

    // 기상 정보 이미지 업데이트
    if (currentScreenIndex === "weather0" ||currentScreenIndex === "weather1" || currentScreenIndex === "weather2" || currentScreenIndex === "weather3" || currentScreenIndex === "weather4" || currentScreenIndex === "weather5" || currentScreenIndex === "weather6" || currentScreenIndex === "weather7" || currentScreenIndex === "weather8" || currentScreenIndex === "weather9" || currentScreenIndex === "weather10" || currentScreenIndex === "weather11" || currentScreenIndex === "weather12" || currentScreenIndex === "weather13" || currentScreenIndex === "weather14" || currentScreenIndex === "weather15" || currentScreenIndex === "weather16" || currentScreenIndex === "weather17" || currentScreenIndex === "weather18" || currentScreenIndex === "weather19" || currentScreenIndex === "weather20" || currentScreenIndex === "weather21" || currentScreenIndex === "weather22" || currentScreenIndex === "weather23" || currentScreenIndex === "weather24" || currentScreenIndex === "weather25" || currentScreenIndex === "weather26" || currentScreenIndex === "weather27" || currentScreenIndex === "weather28") {
        screen(generateImageURL(time, baseImages[`weather${currentScreenIndex.substr(7)}_left_default`]), generateImageURL(time, baseImages[`weather${currentScreenIndex.substr(7)}_right_default`]));
        currentRightSrc = baseImages[`weather${currentScreenIndex.substr(7)}_right_default`];
    }

    // 항목 정보 이미지 업데이트 (좌측 화면만 업데이트)
    if (currentScreenIndex === "item1" || currentScreenIndex === "item2" || currentScreenIndex === "item3" || currentScreenIndex === "item4" || currentScreenIndex === "item5" || currentScreenIndex === "item6" || currentScreenIndex === "item7" || currentScreenIndex === "item8" || currentScreenIndex === "item9" || currentScreenIndex === "item10") {
        console.log("item", currentScreenIndex);

        console.log("currentRightSrc", currentRightSrc);
        screen(generateImageURL(time, baseImages[`item${currentScreenIndex.substr(4)}_left_default`]), generateImageURL(time, currentRightSrc));
    }
    //계절 예측
    if (currentScreenIndex === "fore6") {
        $('#select-fore').find('option:selected');
        screen(generateImageURL(time, baseImages[`${currentScreenIndex}_left_default`]), generateImageURL(time, baseImages[`${currentScreenIndex}_right_default`]));
    }
    //초단기 예측
        if (currentScreenIndex === "fore1") {
        $('#select-fore').find('option:selected');
        $("#range-def").hide();
        $("#range-fore").show();
        screen(generateImageURL(time, baseImages[`${currentScreenIndex}_left_default`]), generateImageURL(time, baseImages[`${currentScreenIndex}_right_default`]));
    } else {
         $("#range-def").show();
         $("#range-fore").hide();
    }
    // 전국/수도권 통보문, 단기/중기 예보, 바다 예보, 조석 정보
    $("#screen, #widget-fore2, #widget-fore3, #widget-fore4, #widget-fore5, #widget-fore8").hide();
    switch (currentScreenIndex) {
        case "fore2":
            $("#widget-fore2").show();
            break;
        case "fore3":
            $("#widget-fore3").show();
            break;
        case "fore4":
            $("#widget-fore4").show();
            break;
        case "fore5":
            $("#widget-fore5").show();
            break;    
        case "fore8":
            $("#widget-fore8").show();
            break;             
        default:
            $("#screen").show();
            break;
    }
}

function jumpToDate() {
    selectedTime = new Date($datePicker.value);
    selectedTime.setMinutes(Math.floor(selectedTime.getMinutes() / 5) * 5);
    $timeSlider.value = 48;
    updateSlider(selectedTime);
}

function updateDatePickerDefault() {
    $datePicker.value = changeDateFormat();
}

function init() {
    setLatestTime();
    jumpToDate();
    updateImages(currentTime);
    updateDatePickerDefault();
    setInterval(updateDatePickerDefault, 60000);
}

init();


// 마우스 우클릭 방지
document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
}, false);

// 마우스 오른쪽 버튼 차단
document.addEventListener('mousedown', function (e) {
    if (e.button === 2) {
        e.preventDefault();
    }
}, false);

// 텍스트 선택 방지
document.addEventListener('selectstart', function (e) {
    e.preventDefault();
}, false);

// 키보드 단축키 차단 (Ctrl+U, Ctrl+S, Ctrl+C, F12)
document.addEventListener('keydown', function (e) {
    if (e.ctrlKey && (e.key === 'u' || e.key === 's' || e.key === 'c')) {
        e.preventDefault();
    }
    if (e.key === 'F12') {
        e.preventDefault();
    }
}, false);

// 드래그 이벤트 차단
document.addEventListener('dragstart', function (e) {
    e.preventDefault();
}, false);

