// ฟังก์ชันสำหรับการพิมพ์ข้อความ
function typeWriter(element, text, speed, callback) {
    let i = 0;
    element.style.display = 'block';
    element.innerHTML = ''; // ลบข้อความเก่า
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else if (callback) {
            callback(); // เรียก callback เมื่อพิมพ์เสร็จ
        }
    }
    type();
}

// ฟังก์ชันลบข้อความทีละตัวอักษร
function removeMessage(element, speed, callback) {
    let text = element.innerHTML;
    let i = text.length - 1;

    function deleteChar() {
        if (i >= 0) {
            element.innerHTML = text.substring(0, i);
            i--;
            setTimeout(deleteChar, speed);
        } else if (callback) {
            callback(); // เรียก callback เมื่อข้อความถูกลบหมด
        }
    }
    deleteChar();
}

// เมื่อคลิกที่กล่อง
document.getElementById("box").addEventListener("click", function() {
    const messages = [
        "Happy New Year 2025",
"ขอให้ปีใหม่เต็มไปด้วยความสุขและความสำเร็จ",
"ขอให้สุขภาพแข็งแรงและโชคดีตลอดปี",
"ขอให้ความรักและความสุขอยู่รอบตัวคุณตลอดปีใหม่",
"ขอให้ปี 2025 เป็นปีที่เต็มไปด้วยโอกาสใหม่ๆ และการเริ่มต้นที่ดี",
"ขอให้คุณและครอบครัวมีความสุขและเจริญรุ่งเรืองในปีใหม่ที่จะมาถึง",
"ขอให้ทุกวันในปีใหม่นำพาความหวังดีและความสำเร็จมาสู่คุณ",
"ขอให้ความฝันทุกอย่างของคุณเป็นจริงในปีใหม่นี้",
"ขอให้ความรักและมิตรภาพในชีวิตคุณเพิ่มพูนขึ้นเรื่อยๆ",
"ขอให้ปีใหม่นี้เต็มไปด้วยการผจญภัยใหม่ๆ ที่น่าตื่นเต้น",
"ขอให้คุณมีแรงบันดาลใจใหม่ๆ และความมุ่งมั่นในทุกสิ่งที่ทำ",
"ขอให้ปีใหม่เต็มไปด้วยความสงบและความสุขในใจ",
"ขอให้คุณก้าวไปข้างหน้าด้วยความมั่นใจและความแข็งแกร่ง",
"ขอให้โชคลาภและความสำเร็จตามมาทุกย่างก้าวในปีใหม่",
"ขอให้ปี 2025 เป็นปีที่ดีที่สุดของคุณ!",
"ขอให้คุณมีความสุขในทุกๆ วันและความสำเร็จในทุกๆ ความพยายาม",
"ขอให้ปีใหม่เติมเต็มทุกอย่างที่คุณปรารถนา",
"ขอให้คุณและครอบครัวมีความรักและความสุขตลอดทั้งปี",
"ขอให้ทุกๆ วันในปี 2025 เป็นวันที่สดใสและเต็มไปด้วยความหวัง",
"ขอให้ปีใหม่นี้นำพาความโชคดีและความเจริญรุ่งเรืองมาให้คุณเสมอ"
    ];
    

    // หน่วงเวลา 3 วินาที ก่อนเริ่มพิมพ์ข้อความ
    setTimeout(() => {
        function printMessages(index) {
            if (index < messages.length) {
                const messageId = `message${index + 1}`;
                const element = document.getElementById(messageId);

                if (element) {
                    typeWriter(element, messages[index], 100, function() {
                        setTimeout(() => {
                            removeMessage(element, 100, function() {
                                printMessages(index + 1); // พิมพ์ข้อความถัดไปหลังจากลบข้อความเสร็จ
                            });
                        }, 2000); // รอ 2 วินาทีก่อนที่จะลบข้อความ
                    });
                }
            }
        }

        printMessages(0); // เริ่มต้นพิมพ์ข้อความที่ index 0
    }, 4000); // หน่วงเวลา 3 วินาที
});
