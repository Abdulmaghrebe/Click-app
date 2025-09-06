function downloadVideo() {
  const url = document.getElementById("videoUrl").value;
  if (!url) {
    alert("من فضلك أدخل رابط فيديو!");
    return;
  }

  // يوجه المستخدم مباشرةً لرابط التنزيل من السيرفر
  window.location.href = `/download?url=${encodeURIComponent(url)}`;
}
