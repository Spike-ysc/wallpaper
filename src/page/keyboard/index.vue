<template>
  <div>
    <div style="padding: 20px">
     <!-- <el-table :data="" border stripe>
       <el-table-column v-for="col in columns"
         :prop="col.id"
         :key="col.id"
         :label="col.label"
         :width="col.width">
       </el-table-column>
     </el-table> -->
     
      







      <table class="table" border="1">
        <tr>
          <td id="27">Esc</td>
          <td class="no-border"></td>
          <td id="112">F1</td>
          <td id="113">F2</td>
          <td id="114">F3</td>
          <td id="115">F4</td>
          <td id="116">F5</td>
          <td id="117">F6</td>
          <td id="118">F7</td>
          <td id="119">F8</td>
          <td id="120">F9</td>
          <td id="121">F10</td>
          <td id="122">F11</td>
          <td id="123">F12</td>
          <td class="no-border"></td>
          <td class="warning">PrtSc</td>
          <!-- noCodeKey -->
          <td id="145">ScrLk</td>
          <td id="19">Pause</td>
        </tr>
        <tr>
          <td id="192">~</td>
          <td id="49">1</td>
          <td id="50">2</td>
          <td id="51">3</td>
          <td id="52">4</td>
          <td id="53">5</td>
          <td id="54">6</td>
          <td id="55">7</td>
          <td id="56">8</td>
          <td id="57">9</td>
          <td id="48">0</td>
          <td id="189">-</td>
          <td id="187">=</td>
          <td id="8">back</td>
          <td class="no-border"></td>
          <td id="45">Ins</td>
          <td id="36">Home</td>
          <td id="33">PgUp</td>
          <td class="no-border"></td>
          <td id="144">Num</td>
          <td id="111">/</td>
          <td id="106">*</td>
          <td id="109">-</td>
        </tr>
        <tr>
          <td id="9">Tab</td>
          <td id="81">Q</td>
          <td id="87">W</td>
          <td id="69">E</td>
          <td id="82">R</td>
          <td id="84">T</td>
          <td id="89">Y</td>
          <td id="85">U</td>
          <td id="73">I</td>
          <td id="79">O</td>
          <td id="80">P</td>
          <td id="219">[</td>
          <td id="221">]</td>
          <td id="220">\</td>
          <td class="no-border"></td>
          <td id="46">Del</td>
          <td id="35">End</td>
          <td id="34">pgDn</td>
          <td class="no-border"></td>
          <td id="103">7</td>
          <td id="104">8</td>
          <td id="105">9</td>
          <td id="107" rowspan="2">+</td>
        </tr>
        <tr>
          <td id="20">Caps</td>
          <td id="65">A</td>
          <td id="83">S</td>
          <td id="68">D</td>
          <td id="70">F</td>
          <td id="71">G</td>
          <td id="72">H</td>
          <td id="74">J</td>
          <td id="75">K</td>
          <td id="76">L</td>
          <td id="186">;</td>
          <td id="222">'</td>
          <td id="13" colspan="2">Enter</td>
          <td colspan="5" class="no-border"></td>
          <td id="100">4</td>
          <td id="101">5</td>
          <td id="102">6</td>
        </tr>
        <tr>
          <td id="16" colspan="2">Shift</td>
          <td id="90">Z</td>
          <td id="88">X</td>
          <td id="67">C</td>
          <td id="86">V</td>
          <td id="66">B</td>
          <td id="78">N</td>
          <td id="77">M</td>
          <td id="188">,</td>
          <td id="190">.</td>
          <td id="191">/</td>
          <td id="16" colspan="2">Shift</td>
          <td class="no-border"></td>
          <td class="no-border"></td>
          <td id="38">up</td>
          <td class="no-border"></td>
          <td class="no-border"></td>
          <td id="97">1</td>
          <td id="98">2</td>
          <td id="99">3</td>
          <td id="108" rowspan="2">Enter</td>
        </tr>
        <tr>
          <td id="17">Ctrl</td>
          <td id="91">win</td>
          <td id="18">Alt</td>
          <td id="32" colspan="8">Spacebar</td>
          <td id="18">Alt</td>
          <td class="warning">Fn</td>
          <!-- noCodeKey -->
          <td id="17">Ctrl</td>
          <td class="no-border"></td>
          <td id="37">left</td>
          <td id="40">down</td>
          <td id="39">right</td>
          <td class="no-border"></td>
          <td id="96" colspan="2">0</td>
          <td id="110">.</td>
        </tr>
      </table>
    </div>
    <div class="container">
      <form class="form" action="#">
        <el-input
          type="text"
          name="keyBoard"
          v-model="input"
          placeholder="开始测试"
          id="keyBoard"
          @keydown="keyBoardDown($event)"
        />
        <!-- <button id="startBtn" class="btn btn-primary">开始测试</button> -->
      </form>
      <h4></h4>
      <el-card shadow="always" :body-style="{ padding: '20px' }">
        <div slot="header">
          <span>注意事项</span>
        </div>
      <div class="panel-body">
          <p>1.开始测试时要输入法切换到英文</p>
          <p>2.输入框获得焦点就可以测试，在输入框中无法使用F5刷新等快捷键</p>
          <p>3.测试Num键时，要按两次，否则或锁住数字键，导致检测失败。</p>
          <p>4.相同功能的按键无法识别，如左边的Ctrl和右边的Ctrl</p>
          <p>5.在测试的时候要注意输入法状态，因为有可能会切换为中文</p>
          <p>6.当一直出现输出caps，有可能时输入法的问题。</p>
          <p>7.PrtSc和Fn键无法识别。</p>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
// var codeToKey = {
//   //字母和数字键--字母
//   65: "A",
//   66: "B",
//   67: "C",
//   68: "D",
//   69: "E",
//   70: "F",
//   71: "G",
//   72: "H",
//   73: "I",
//   74: "J",
//   75: "K",
//   76: "L",
//   77: "M",
//   78: "N",
//   79: "O",
//   80: "P",
//   81: "Q",
//   82: "R",
//   83: "S",
//   84: "T",
//   85: "U",
//   86: "V",
//   87: "W",
//   88: "X",
//   89: "Y",
//   90: "Z",

//   //字母和数字键--数字
//   48: "0",
//   49: "1",
//   50: "2",
//   51: "3",
//   52: "4",
//   53: "5",
//   54: "6",
//   55: "7",
//   56: "8",
//   57: "9",

//   //数字键盘
//   96: "0",
//   97: "1",
//   98: "2",
//   99: "3",
//   100: "4",
//   101: "5",
//   102: "6",
//   103: "7",
//   104: "8",
//   105: "9",
//   106: "*",
//   107: "+",
//   108: "Enter",
//   109: "-",
//   110: ".",
//   111: "/",

//   //功能键键码
//   112: "F1",
//   113: "F2",
//   114: "F3",
//   115: "F4",
//   116: "F5",
//   117: "F6",
//   118: "F7",
//   119: "F8",
//   120: "F9",
//   121: "F10",
//   122: "F11",
//   123: "F12",

//   //控制键
//   8: "BackSpace",
//   9: "Tab",
//   12: "Clear",
//   13: "Enter",
//   16: "Shift",
//   17: "Control",
//   18: "Alt",
//   20: "Cape Lock",
//   27: "Esc",
//   32: "Spacebar",
//   33: "Page Up",
//   34: "Page Down",
//   35: "End",
//   36: "Home",
//   37: "Left Arrow",
//   38: "Up Arrow",
//   39: "Right Arrow",
//   40: "Dw Arrow",
//   45: "Insert",
//   46: "Delete",
//   144: "Num Lock",
//   186: ";:",
//   187: "=+",
//   188: ",<",
//   189: "-_",
//   190: ".>",
//   191: "/?",
//   192: "`~",
//   219: "[{",
//   220: "\\|",
//   221: "]}",
//   222: "'\"",
//   91: "window",
//   229: "Caps",
//   145: "ScrLk",
//   19: "Pause",
// };

// var result = "你按下的按键为：";
// $(document).ready(function () {
//   $("#startBtn").click(function () {
//     $("#keyBoard").focus();
//   });
//   for (var key in codeToKey) {
//     console.log(key + ":" + codeToKey[key]);
//   }
//   $("#keyBoard").keydown(function (e) {
//     var evt = e || window.event;
//     var keyCode = evt.keyCode || evt.which || evt.charCode;
//     if (keyCode == 116 || (e.ctrlKey && keyCode == 82)) {
//       console.log(keyCode);
//       // return false;
//     }
//     if (e.shiftKey && event.keyCode == 121) {
//       console.log(keyCode);
//       // return false;
//     }
//     if (e.ctrlKey) {
//       console.log(keyCode + "ctrl");
//       // return false;
//     }
//     result += codeToKey[keyCode] + " ";
//     $("h4").text(result);
//     myId = "#" + keyCode;
//     $(myId).css({ background: "#2ecc71", color: "white" });
//     console.log(keyCode);
//     return false;
//   });
// });
</script>
<script>
export default {
  data() {
    return{
      input:''
    };
  },
  
  methods: {

    
    keyBoardDown(ev){
      console.log(ev.keyCode)
    },
//       document.addEventListener("keydown",function(e){
//     alert("您按下的按钮的keyCode为："+e.keyCode)

// }),
 submit: function() {
            alert("监听到enter键");
        },
  },
//   ready() {
//   window.addEventListener('focus', this.handleWinFocus);
// },
// beforeDestroy() {
//   window.removeEventListener('focus', this.handleWinFocus);
// },
created: function(){
   var _this = this;
        document.onkeydown = function(e) {
              var evt = e || window.event;
    var keyCode = evt.keyCode || evt.which || evt.charCode;
    console.log(keyCode)
    return false
            // let key = window.event.keyCode;
            // if (key == 13) {
            //     _this.submit();
            // }
        };
}

}
</script>

    <style scoped lang="scss">
td {
  width: 40px;
  text-align: center;
}

.no-border {
  border: 0px !important;
}
table {
  padding: 10px;
  border: 0px;
      width: 100%;
    max-width: 100%;
    margin-bottom: 20px;
    border-spacing: 0;
    border-collapse: collapse;
    box-sizing: border-box;
}
tr{
      display: table-row;
    vertical-align: inherit;
    border-color: inherit;
        border-spacing: 0;
    border-collapse: collapse;
}
td{
  padding: 8px;
    line-height: 1.42857143;
    vertical-align: top;
    border-top: 1px solid #ddd;
        width: 40px;
    text-align: center;
}

.container {
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}
@media (min-width: 768px) {
  .container {
    width: 750px;
  }
}
@media (min-width: 992px) {
  .container {
    width: 970px;
  }
}
@media (min-width: 1200px) {
  .container {
    width: 1170px;
  }
}
.panel-body{
  text-align: left;
}
</style>