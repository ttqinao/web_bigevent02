$(function () {
  template.defaults.imports.deteFormat = function (dtstr) {
    var dt = new Date(dtstr);

    var y = dt.getFullYear();
    var m = dt.getMonth() + 1;
    m = buling(m);
    var d = dt.getDate();
    d = buling(d);

    var hh = dt.getHours();
    hh = buling(hh);
    var mm = dt.getMinutes();
    mm = buling(mm);
    var ss = dt.getSeconds();
    ss = buling(ss);

    return y + "-" + m + "-" + d + "  " + hh + ":" + mm + ":" + ss;
  };
  function buling(n) {
    return n >= 10 ? n : "0" + n;
  }
  var form = layui.form;
  var layer = layui.layer;
  var q = {
    pagenum: 1,
    pagesize: 2,
    cate_id: "",
    state: "",
  };
  // 初始化表格
  initTable();
  function initTable() {
    $.ajax({
      method: "get",
      url: "/my/article/list",
      data: q,
      success: function (res) {
        var str = template("tpl-table", res);
        $("tbody").html(str);
        //分页
        renderPage(res.total);
      },
    });
  }
  //初始化下拉列表
  initCate();
  function initCate() {
    $.ajax({
      method: "get",
      url: "/my/article/cates",
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        var str = template("tpl-cate", res);
        $("[name=cate_id]").html(str);
        form.render();
      },
    });
  }

  //筛选功能
  $("#form-search").on("submit", function (e) {
    e.preventDefault();
    var state = $("[name=state]").val();
    var cate_id = $("[name=cate_id]").val();
    q.state = state;
    q.cate_id = cate_id;
    initTable();
  });

  //5.分页
  var laypage = layui.laypage;
  function renderPage(total) {
    //执行一个laypage实例
    laypage.render({
      elem: "test1", //注意，这里的 test1 是 ID，不用加 # 号
      count: total, //数据总数，从服务端得到
      limit: q.pagesize,
      curr: q.pagenum,
      layout: ["count", "limit", "prev", "page", "next", "skip"],
      limits: [2, 3, 5, 10],
      jump: function (obj, first) {
        //obj包含了当前分页的所有参数，比如：
        // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
        // console.log(obj.limit); //得到每页显示的条数
        q.pagenum = obj.curr;
        q.pagesize = obj.limit;
        //首次不执行
        if (!first) {
          //do something
          initTable();
        }
      },
    });
  }

  //6.删除
  var layer = layui.layer;
  $("tbody").on("click", ".btn_delete", function () {
    var id = $(this).attr("data-id");
    layer.confirm("确认删除?", { icon: 3, title: "提示" }, function (index) {
      $.ajax({
        method: "get",
        url: "/my/article/delete/" + id,
        success: function (res) {
          if (res.status !== 0) {
            return layer.msg(res.message);
          }
          if ($(".btn_delete").length == 1 && q.pagenum > 1) q.pagenum--;
          initTable();
          layer.msg(res.message);
          layer.close(index);
        },
      });
    });
  });
});
