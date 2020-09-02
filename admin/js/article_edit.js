$(function() {
      //加载日期插件
        jeDate('#testico', {
            trigger: 'click',
            theme: { bgcolor: "#00A680", pnColor: "#00DDAA" },//绿色主题
            format: "YYYY-MM-DD",
            isinitVal: true,
        });

        document.querySelector('#btn').onclick = function(){
            console.log(document.querySelector('#testico').value);
        };



})