// تنفيذ التعليمات البرمجية عند تحميل الصفحة بالكامل
document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('#loginForm'); // اختيار النموذج باستخدام المعرف "id"

    // إضافة مستمع للحدث "submit" للنموذج
    form.addEventListener('submit', async function (event) {
        event.preventDefault(); // منع إعادة تحميل الصفحة عند الإرسال

        // استخراج القيم المدخلة من الحقول
        const username = document.getElementById('username').value; // اسم المستخدم
        const password = document.getElementById('password').value; // كلمة المرور

        // التحقق من إدخال جميع الحقول
        if (username && password) {
            try {
                // إرسال البيانات إلى الخادم عبر طلب POST
                const response = await fetch('/login', {
                    method: 'POST', // نوع الطلب
                    headers: { 'Content-Type': 'application/json' }, // إعدادات نوع البيانات
                    body: JSON.stringify({ username, password }) // البيانات المرسلة في الطلب
                });

                if (response.ok) {
                    const result = await response.json(); // استخراج الاستجابة من الخادم
                    alert(result.message); // عرض رسالة النجاح
                } else {
                    const error = await response.json(); // استخراج رسالة الخطأ
                    alert(error.error); // عرض رسالة الخطأ
                }
            } catch (error) {
                console.error('Error:', error); // طباعة الخطأ في وحدة التحكم
                alert('An error occurred while submitting your data.'); // عرض رسالة خطأ عامة
            }
        } else {
            alert('Please fill in all fields.'); // عرض رسالة إذا كانت الحقول فارغة
        }
    });
});
