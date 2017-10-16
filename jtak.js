// JavaScript Document

        
        //Config emoticons declare
        Emo_List = [
        ':)'  ,'http://1.bp.blogspot.com/-2Z7Cwe04x-Q/UH9THzWWJII/AAAAAAAACtA/ChwawyzYsDI/s1600/smile1.gif',
        ':('  ,'http://4.bp.blogspot.com/-yXc7xHs5mXc/UKhVJLBfdaI/AAAAAAAADPY/LJKRsefyeao/s1600/sad.gif',
        '=('  ,'http://1.bp.blogspot.com/-7I8DdEs58z0/UKhVKHT1yUI/AAAAAAAADPg/Lyzv-E74EdM/s1600/sadanimated.gif',
        '^_^'  ,'http://1.bp.blogspot.com/-IoZJlpB0-dE/UKhVKnR0BDI/AAAAAAAADPo/Kz87N1Aj4X8/s1600/smile.gif',
        ':D'  ,'http://3.bp.blogspot.com/-WeTjMT8JDhg/UKhVHlZ88II/AAAAAAAADPI/b1gpiAvIkCc/s1600/icon_smile.gif',
        '=D'  ,'http://1.bp.blogspot.com/-ljeobbA3sn0/UKhVGtJsGRI/AAAAAAAADPA/8lyzE4JwrwQ/s1600/hihi.gif',
        '|o|'  ,'http://4.bp.blogspot.com/-ip66eq3uRI8/UKhVF-QK8lI/AAAAAAAADO4/P0G-1PcWpQs/s1600/applause.gif',
        '@@,'  ,'http://4.bp.blogspot.com/-w1VfvgO2-e8/UKhVIT7XLhI/AAAAAAAADPQ/cJ0KDjEsoj4/s1600/rolleyes.gif',
        ';)'  ,'http://3.bp.blogspot.com/-5zPfqshivtY/UKhVONWZnkI/AAAAAAAADQI/iCDxagcaj5s/s1600/wink.gif',
        ':-bd'  ,'http://4.bp.blogspot.com/-hPd-oj2Bzo4/UKhVLkmQjOI/AAAAAAAADPw/3O1iuAukZXg/s1600/thumb.gif',
        ':-d'  ,'http://2.bp.blogspot.com/-yElQmFAIiII/UKhVMcObcQI/AAAAAAAADP4/-qdEpW8zCmY/s1600/thumbsup.gif', 
        ':p'  ,'http://2.bp.blogspot.com/-bs2e9gRj748/UKhVNKLs2YI/AAAAAAAADQA/mF7lDNOChac/s1600/wee.gif',      
        ]; 
        
                               
                                //Config Force tag list, define all in lower case
                                Force_Tag = [
                                    '[pre]','<pre>',
                                    '[/pre]','</pre>',
                                    '<pre class="brush: plain; title: ; notranslate" title="">','&lt;code&gt;',
                                    '</pre>','</code>'
                                ];
      
         var Cur_Cform_Hdr = '.comment_form';
         var Cur_Cform_Url = $('#comment-editor').attr('src');

         function trim(str) {
             var whitespace = ' \n\r\t\f\x5b\x5d\x7c\x7d\x3c\x3e\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000';
             for (var i = 0; i < str.length; i++) {
                 if (whitespace.indexOf(str.charAt(i)) != -1) {
                     str = str.substring(0, i);
                     break
                 }
             }
             return str
         }
         $('#comment_block .comment_body p').html(function (index, oldhtml) {
             if (Replace_Youtube_Link) {
                 var search_key = 'http://www.youtube.com/watch?v=';
                 var check_index = oldhtml.indexOf(search_key);
                 while (check_index != -1) {
                     ht = oldhtml.substring(check_index);
                     yt_link = trim(ht);
                     var yt_code_index = yt_link.indexOf('&');
                     var yt_code = '';
                     if (yt_code_index == -1) {
                         yt_code = yt_link.substring(search_key.length)
                     } else {
                         yt_code = yt_link.substring(search_key.length, yt_code_index)
                     }
                     var yt_video = '<iframe class="comment_youtube" src="http://www.youtube.com/embed/' + yt_code + '?autohide=1" frameborder="0" allowfullscreen></iframe>';
                     oldhtml = oldhtml.substring(0, check_index) + yt_video + oldhtml.substring(check_index + yt_link.length);
                     check_index = oldhtml.indexOf(search_key);
                     if (check_index == -1) {
                         search_key = 'https://www.youtube.com/watch?v=';
                         check_index = oldhtml.indexOf(search_key)
                     }
                 }
             }
             if (Replace_Image_Link) {
                 var save_html = '';
                 var temp_html = oldhtml;
                 for (var i = 0; i < Replace_Image_Ext.length; i++) {
                     var search_key = '.' + Replace_Image_Ext[i];
                     var upper_html = temp_html.toUpperCase();
                     var check_index = upper_html.indexOf(search_key);
                     while (check_index != -1) {
                         img_src = temp_html.substring(0, check_index + search_key.length);
                         upper_html = img_src.toUpperCase();
                         var http_search = 'HTTP://';
                         var find_http = upper_html.indexOf(http_search);
                         var save_http = '';
                         while (find_http != -1) {
                             save_http = http_search.toLowerCase();
                             img_src = img_src.substring(find_http + http_search.length);
                             upper_html = img_src.toUpperCase();
                             find_http = upper_html.indexOf(http_search)
                         }
                         http_search = 'HTTPS://';
                         upper_html = img_src.toUpperCase();
                         find_http = upper_html.indexOf(http_search);
                         while (find_http != -1) {
                             save_http = http_search.toLowerCase();
                             img_src = img_src.substring(find_http + http_search.length);
                             upper_html = img_src.toUpperCase();
                             find_http = upper_html.indexOf(http_search)
                         }
                         if (save_http == '' || img_src.length < 6) {
                             break
                         }
                         img_src = save_http + img_src;
                         save_html += temp_html.substring(0, check_index + search_key.length - img_src.length) + '<img src="' + img_src + '" alt="' + img_src + '" class="comment_img"/>';
                         temp_html = temp_html.substring(check_index + search_key.length);
                         upper_html = temp_html.toUpperCase();
                         check_index = upper_html.indexOf(search_key)
                     }
                 }
                 oldhtml = save_html + temp_html
             }
             if (Display_Emo) {
                 var length = Emo_List.length;
                 if (length % 2 == 1) {
                     length--
                 }
                 for (var i = 0; i < length; i += 2) {
                     var img_html = '<img src="' + Emo_List[i + 1] + '" class="comment_emo"/>';
                     check_index = oldhtml.indexOf(Emo_List[i]);
                     while (check_index != -1) {
                         oldhtml = oldhtml.substring(0, check_index) + img_html + oldhtml.substring(check_index + Emo_List[i].length);
                         check_index = oldhtml.indexOf(Emo_List[i])
                     }
                 }
             }
             if (Replace_Force_Tag) {
                 var length = Force_Tag.length;
                 if (length % 2 == 1) {
                     length--
                 }
                 for (var i = 0; i < length; i += 2) {
                     while (1) {
                         var temp_html = oldhtml.toLowerCase();
                         check_index = temp_html.indexOf(Force_Tag[i]);
                         if (check_index != -1) {
                             oldhtml = oldhtml.substring(0, check_index) + Force_Tag[i + 1] + oldhtml.substring(check_index + Force_Tag[i].length)
                         } else {
                             break
                         }
                     }
                 }
             }
             return oldhtml
         });
         $('.comment_emo_list').html(function (index, oldhtml) {
             if (Display_Emo) {
                 var length = Emo_List.length;
                 if (length % 2 == 1) {
                     length--
                 }
                 var newhtml = '';
                 for (var i = 0; i < length; i += 2) {
                     var img_code = '<span>' + Emo_List[i] + '</span>';
                     var img_html = '<img src="' + Emo_List[i + 1] + '" class="comment_emo"/>';
                     newhtml += '<div class="item">' + img_html + img_code + '</div>'
                 }
                 return newhtml
             }
         });
         $('.comment_wrap .comment_body p').html(function (i, h) {
             temp = h.toLowerCase();
             index = temp.indexOf('@<a href="#c');
             if (index != -1) {
                 index_tail = temp.indexOf('</a>', index);
                 if (index_tail != -1) {
                     h = h.substring(0, index) + h.substring(index_tail + 4)
                 }
             }
             return h
         });

         function Valid_Par_Id(par_id) {
             r = par_id.indexOf('c');
             if (r != -1) par_id = par_id.substring(r + 1);
             return par_id
         }

         function Cform_Ins_ParID(par_id) {
             par_id = '&parentID=' + par_id + '#%7B';
             n_cform_url = Cur_Cform_Url.replace(/#%7B/, par_id);
             return n_cform_url
         }

         function Reset_Comment_Form() {
             html = $(Cur_Cform_Hdr).html();
             $(Cur_Cform_Hdr).html('');
             Cur_Cform_Hdr = '.comment_form';
             $(Cur_Cform_Hdr).html(html);
             $('#comment-editor').attr('src', Cur_Cform_Url);
             $('.cancel, .rep-comment').hide()
         }

         function Display_Reply_Form(e) {
             par_id = $(e).attr('id');
             $('.cancel, .rep-comment').hide();
             par_id = Valid_Par_Id(par_id);
             html = $(Cur_Cform_Hdr).html();
             if (Cur_Cform_Hdr == '.comment_form') {
                 reset_html = '<a class="add-comment" href="#origin_cform" onclick="Reset_Comment_Form()">' + Msgs.addComment + '</a><a name="origin_cform"/>';
                 $(Cur_Cform_Hdr).html(reset_html)
             } else {
                 $(Cur_Cform_Hdr).html('')
             }
             Cur_Cform_Hdr = '#r_f_c' + par_id;
             $(Cur_Cform_Hdr).html(html + '<a class="rep-comment" href="#origin_cform" onclick="Reset_Comment_Form()">Batal balas</a><a name="origin_cform"/>');
             $('#comment-editor').attr('src', Cform_Ins_ParID(par_id))
         }
         cur_url = window.location.href;
         search_formid = '#comment-form_';
         search_index = cur_url.indexOf(search_formid);
         if (search_index != -1) {
             ret_id = cur_url.substring(search_index + search_formid.length);
             Display_Reply_Form('#rc' + ret_id)
         }
         for (var i = 0; i < Items.length; i++) {
        if ('parentId' in Items[i]) {
                var par_id = Items[i].parentId;
                var par_level = parseInt($('#c' + par_id + ':first').attr('data-level'));
                $('#c' + par_id + ' .comment_child:first').html(function (index, oldhtml) {
                        var child_id = Items[i].id;
                        if (par_level >= Config.maxThreadDepth) {
                                $('#c' + child_id + ':first .comment_reply').remove()
                        }
                        var child_html = $('#c' + child_id + ':first').html();
                        child_html = '<div class="comment_wrap" id="c' + child_id + '" data-level="' + (par_level + 1) + '">' + child_html + '</div>';
                        $('#c' + child_id).remove();
                        return (oldhtml + child_html)
                })
        }
}
         var avatar = $("#comments");
         avatar.find('.comment_avatar img').each(function () {
             var ava = $(this).attr('src');
             $(this).show().attr('src', ava.replace(/\/s[0-9]+(\-c)?\//, "/s200-c/"))
         });        


//No live link
function blockLinks(parentID, children) {
    var parent = document.getElementById(parentID),
        content = parent.getElementsByTagName(children);
    for (var i = 0; i < content.length; i++) {
        if (content[i].innerHTML.indexOf('</a>') !== -1) {
			var belum_salin = content[i].innerHTML;
            var salinan = belum_salin.replace(/<br\/>/ig,"\n")
									 .replace(/&/g,"&amp;")
									 .replace(/</g,"&lt;")
									 .replace(/>/g,"&gt;")
									 .replace(/&lt;pre&gt;/ig,"&lt;i rel=\"pre\"&gt;")
									 .replace(/&lt;code&gt;/ig,"&lt;i rel=\"code\"&gt;")
									 .replace(/&lt;blockquote&gt;/ig,"&lt;b rel=\"quote\"&gt;")
									 .replace(/&lt;h([1-6])&gt;/ig,"&lt;b rel=\"h$1\"&gt;")
									 .replace(/&lt;\/(code|pre)&gt;/ig,"&lt;\/i&gt;")
									 .replace(/&lt;\/(blockquote|h[1-6])&gt;/ig,"&lt;\/b&gt;");
            content[i].innerHTML = "<mark><a href='/p/komentar.html#live-link' title='peraturan berkomentar'>No live link!!!</a></mark> Komentar Anda telah dihapus/disembunyikan untuk alasan keamanan dan kenyamanan pembaca lain. Berikut isi komentar Anda sebelumnya:<br/><textarea  spellcheck='off'>" + salinan + "</textarea><br/>";
            content[i].className = "spammer-detected";
        }
		
    }
}
//tahan link, mis: oot
function tahanLinks(parentID, children) {
    var parent = document.getElementById(parentID),
        content = parent.getElementsByTagName(children);
    for (var u = 0; u < content.length; u++) {
        var regex = /(^| |>)(oot|ott|OOT|OTT|keluar topik|out of topic|off topic|diluar topik|di luar topik|tidak sesuai dengan pembahasan|tidak sesuai topik|tidak sesuai dengan topik|menyimpang dari topik|minta template|blackberry|togel)(<| |$)/g,
            html = content[u].innerHTML;
        content[u].innerHTML = (regex.test(html)) ? '<del>' + html.replace(regex, "$1<mark>$2</mark>$3") + '</del><br><br>Kata-kata yang ditandai tidak boleh ada di dalam komentar.' : html;
    }
}

// Jalankan fungsi!
blockLinks('comment_block', 'p');
tahanLinks('comment_block', 'p');

function repText(id) {
    var a = (document.getElementById(id)) ? document.getElementById(id) : "",
        b = (a !== "") ? a.innerHTML : a,
        c = "http://dte-project.googlecode.com/svn/trunk/emoticon/";
        // Images
        b = b.replace(/<i rel="image">(.*?)<\/i>/ig, "<span style='text-align:center;'><a href='$1' target='_blank' rel='nofollow'><img title='Gambar referensi' class='cm-image' src='$1' alt='Memuat...' \/><\/a><\/span>");
        b = b.replace(/\[img\](.*?)\[\/img\]/ig, "<span style='text-align:center;'><a href='$1' target='_blank' rel='nofollow'><img title='Gambar referensi' class='cm-image' src='$1' alt='Memuat...' \/><\/a><\/span>");
        // YouTube video
        b = b.replace(/<i rel="youtube">(http|https):\/\/www\.youtube\.com\/embed\/(.*?)<\/i>/ig, "<span class='cm-youtube'><iframe src='http://www.youtube.com/embed/$1'><\/iframe><\/span>");
        b = b.replace(/<i rel="youtube">(http|https)(:\/\/youtu\.be\/|http:\/\/www\.youtube\.com\/watch\?v\=)(.*?)<\/i>/ig, "<span class='cm-youtube'><iframe src='http://www.youtube.com/embed/$2'><\/iframe><\/span>");
        b = b.replace(/\[youtube\](http|https):\/\/www\.youtube\.com\/embed\/(.*?)\[\/youtube\]/ig, "<span class='cm-youtube'><iframe src='http://www.youtube.com/embed/$1'><\/iframe><\/span>");
        b = b.replace(/\[youtube\](http|https)(:\/\/youtu\.be\/|http:\/\/www\.youtube\.com\/watch\?v\=)(.*?)\[\/youtube\]/ig, "<span class='cm-youtube'><iframe src='http://www.youtube.com/embed/$2'><\/iframe><\/span>");
		//vimeo video
		b = b.replace(/<i rel="vimeo">(http:\/\/player\.vimeo\.com\/video\/)(.*?)<\/i>/ig, "<span class='cm-youtube'><iframe src='http://player.vimeo.com/video/$2?title=0&amp;amp;byline=0&amp;amp;portrait=0&amp;amp;color=87e0a2' webkitAllowFullScreen mozallowfullscreen allowFullScreen><\/iframe><\/span>");
		b = b.replace(/\[vimeo\](http:\/\/player\.vimeo\.com\/video\/)(.*?)\[\/vimeo\]/ig, "<span class='cm-youtube'><iframe src='http://player.vimeo.com/video/$2?title=0&amp;amp;byline=0&amp;amp;portrait=0&amp;amp;color=87e0a2' webkitAllowFullScreen mozallowfullscreen allowFullScreen><\/iframe><\/span>");
		//flash dan musik
		b = b.replace(/<i rel="musik">(.*?)<\/i>/ig, "<embed class='musik' pluginspage='http://www.macromedia.com/go/getflashplayer' quality='low' src='$1' type='application/x-shockwave-flash' wmode='transparent' allowfullscreen='true'><\/embed>");
		b = b.replace(/\[musik\](.*?)\[\/musik\]/ig, "<embed class='musik' pluginspage='http://www.macromedia.com/go/getflashplayer' quality='low' src='$1' type='application/x-shockwave-flash' wmode='transparent' allowfullscreen='true'><\/embed>");
        // Code & text block
        b = b.replace(/<i rel="code">(.*?)<\/i>/ig, "<code>$1<\/code>");
        b = b.replace(/<i rel="pre">(.*?)<\/i>/ig, "<pre>$1<\/pre>");
        b = b.replace(/<b rel="quote">(.*?)<\/b>/ig, "<span class='blockquote'>$1<\/span>");
		b = b.replace(/<b rel="catatan">(.*?)<\/b>/ig, "<br/><span class='catatan'>$1<\/span><br/>");
        b = b.replace(/<b rel="h3">(.*?)<\/b>/ig, "<b class='komen-holder'>$1<\/b><br/>");
		b = b.replace(/<i rel="note">(.*?)<\/i>/ig, "<br/><cite class='peringatan'>$1<\/cite><br/>");
		b = b.replace(/<i rel="taut">(.*?)<\/i>/ig, "<a href='$1' class='allow'>$1<\/a>");
        b = b.replace(/\[code\](.*?)\[\/code\]/ig, "<code>$1<\/code>");
        b = b.replace(/\[pre\](.*?)\[\/pre\]/ig, "<pre>$1<\/pre>");
        b = b.replace(/\[blockquote\](.*?)\[\/blockquote\]/ig, "<span class='blockquote'>$1<\/span>");
		b = b.replace(/\[catatan\](.*?)\[\/catatan\]/ig, "<br/><span class='catatan'>$1<\/span><br/>");
        b = b.replace(/\[h3\](.*?)\[\/h3\]/ig, "<b class='komen-holder'>$1<\/b>");
		b = b.replace(/\[note\](.*?)\[\/note\]/ig, "<br/><cite class='peringatan'>$1<\/cite><br/>");
		b = b.replace(/\[link\](.*?)\[\/link\]/ig, "<a href='$1' title='$1' rel='nofollow' target='_blank'>{link}<\/a>");
		b = b.replace(/\[taut\](.*?)\[\/taut\]/ig, "<a href='$1' title='$1' rel='nofollow' target='_blank' class='allow'>{link}<\/a>");
        // Emoticons
        b = b.replace(/\s:\)+/g, " <img class='emo' alt=':)' src='" + c + "01.gif'\/>");
        b = b.replace(/\s;\)+/g, " <img class='emo' alt=';)' src='" + c + "02.gif'\/>");
        b = b.replace(/\s:\(/g, " <img class='emo' alt=':(' src='" + c + "03.gif'\/>");
        b = b.replace(/\s=\(/g, " <img class='emo' alt='=(' src='" + c + "04.gif'\/>");
        b = b.replace(/\s@@,/g, " <img class='emo' alt='@@,' src='" + c + "05.gif'\/>");
        b = b.replace(/\s:s/ig, " <img class='emo' alt=':s' src='" + c + "07.gif'\/>");
        b = b.replace(/\s:(\\|\/)/g, " <img class='emo' alt=':\\' src='" + c + "08.gif'\/>");
        b = b.replace(/\s:D/g, " <img class='emo' alt=':D' src='" + c + "09.gif'\/>");
        b = b.replace(/\s=D/g, " <img class='emo' alt='=D' src='" + c + "10.gif'\/>");
        b = b.replace(/\s\^:D/g, " <img class='emo' alt='^:D' src='" + c + "11.gif'\/>");
        b = b.replace(/\s\^(\_|)\^/g, " <img class='emo' alt='^_^' src='" + c + "12.gif'\/>");
        b = b.replace(/\s:'\(/g, " <img class='emo' alt=':&#39;(' src='" + c + "13.gif'\/>");
        b = b.replace(/\sT_T/ig, " <img class='emo' alt='T_T' src='" + c + "15.gif'\/>");
        b = b.replace(/\sB\)/g, " <img class='emo' alt='B)' src='" + c + "16.gif'\/>");
        b = b.replace(/\s:Q/ig, " <img class='emo' alt=':Q' src='" + c + "17.gif'\/>");
        b = b.replace(/\s7:\(/g, " <img class='emo' alt='7:(' src='" + c + "19.gif'\/>");
        b = b.replace(/\s:p/ig, " <img class='emo' alt=':p' src='" + c + "20.gif'\/>");
        b = b.replace(/\s:Oz+/ig, " <img class='emo' alt=':Oz' src='" + c + "21.gif'\/>");
        b = b.replace(/\s7:O/ig, " <img class='emo' alt='emo' src='" + c + "22.gif'\/>");
        b = b.replace(/\s\\o\//ig, " <img class='emo' alt='\o/' src='" + c + "23.gif'\/>");
        b = b.replace(/\s\\m\//ig, " <img class='emo' alt='\m/' src='" + c + "24.gif'\/>");
        b = b.replace(/\s(&lt;3|:\*)/ig, " <img class='emo' alt='&lt;3' src='" + c + "25.gif'\/>");
        b = b.replace(/\s0:\)+/ig, " <img class='emo' alt='0:)' src='" + c + "26.gif'\/>");
        b = b.replace(/\s\^o\^/ig, " <img class='emo' alt='^o^' src='" + c + "27.gif'\/>");
        b = b.replace(/\s:-a/ig, " <img class='emo' alt=':-a' src='" + c + "28.gif'\/>");
        b = b.replace(/\s\*fck\*/ig, " <img class='emo' alt='*fck*' src='" + c + "29.gif'\/>");
        b = b.replace(/\sxV/ig, " <img class='emo' alt='xV' src='" + c + "30.gif'\/>");
        b = b.replace(/\sx\@/g, " <img class='emo' alt='x@' src='" + c + "31.gif'\/>");
        b = b.replace(/\s\X\@/g, " <img class='emo' alt='X@' src='" + c + "32.gif'\/>");
        b = b.replace(/\s:-d/ig, " <img class='emo' alt=':-d' src='" + c + "33.gif'\/>");
        b = b.replace(/\s:-bd/ig, " <img class='emo' alt=':-bd' src='" + c + "34.gif'\/>");
        b = b.replace(/\s\~x\(+/ig, " <img class='emo' alt='~x(' src='" + c + "35.gif'\/>");
        b = b.replace(/\s:W/g, " <img class='emo' alt=':W' src='" + c + "37.gif'\/>");
        b = b.replace(/\s\'\'J/ig, " <img class='emo' alt='&#39;&#39;J' src='" + c + "47.gif'\/>");
        // Finishing YouTube and Reduce filesize from images that uploaded by Blogger
        b = b.replace(/&amp;feature=[0-9a-zA-Z-_]*/ig, "");
        b = b.replace(/\/s(640|1600)/g, "/s400");
    if (document.getElementById(id)) {
        document.getElementById(id).innerHTML = b;
    }
} 
repText('comment_block'); 
repText('comment-form');
//iframe embed
$('#comment_block p, #comments dd').each(function() {
    $(this).html($(this).html()
        .replace(/\[iframe\]/ig, "<iframe class='video' src='")
        .replace(/\[\/iframe\]/ig, "' width='400' height='300' frameborder='0' webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>")
    );
    // Jika URL pada iframe.video tidak mengandung path 'youtube.com/embed',
    // segera hapus atribut 'src' pada elemen tersebut
    // lalu tambahkan latar belakang berupa gambar yang menyatakan peringatan kesalahan
	/*var L= $('.cm-youtube')
		e.L.each(function() {
			if (/youtube\.com\/embed/.test($(this).data('src'))) {
				$(this).attr('src', $(this).data('src'));
			} else {
				$(this).replaceWith('<div>Invalid YouTube Iframe URL</div>');
			}
		});
		if (e.C.length&&parseInt(e.C.text(),10)>0) c.h();*/
	//asli
    $('iframe.video:not([src*="youtube.com/embed"])')
        .removeAttr('src')
        .css('background', '#900 url(http://hompimpa.googlecode.com/svn/trunk/personal/images/iframe-fallback.png) no-repeat 50% 50%');
	
});

//filter komentar
var array = {
    //"fuck"       : "duck",
	" fuck"      : " duck",
	"fuck "      : "duck ",
    " goblog"    : " doogie",
	//"goblog"     : "doogie",
	"goblog "    : "doogie ",
	" goblok"    : " doogie",
    //"goblok"     : "doogie",
	"goblok "    : "doogie ",
    " koplok"    : " dasar",
	//"koplok"     : "dasar",
	"koplok "    : "dasar ",
    //"bodo"       : "kurang pintar",
	"bodo "      : "kurang pintar ",
	" bodo"      : " kurang pintar",
	"kontol "    : "jelek ",
	" kontol"    : " jelek",
	//"kontol"     : "jelek",
	" damn"      : " sayang sekali!",
	"damn "      : "sayang sekali! ",
	//"damn"       : "sayang sekali!",
    " bullshit"  : " sayang sekali!",
	//"bullshit"   : "sayang sekali!",
	"bullshit "  : "sayang sekali! "
}

jQuery.fn.textWalk = function(fn) {
    this.contents().each(jwalk);
    function jwalk() {
        var nn = this.nodeName.toLowerCase();
        if (nn === '#text') {
            fn.call(this);
        } else if (this.nodeType === 1 && this.childNodes && this.childNodes[0] && nn !== 'script' && nn !== 'textarea') {
            $(this).contents().each(jwalk);
        }
    }
    return this;
};

$('#comment_block').textWalk(function() {
    for (var val in array) {
        this.data = this.data.replace(new RegExp(val, "g"), array[val]);
    }
});

$('#comment_block').find('a.allow').filter(function() {
			return /(adlmruz\.blogspot\.com|adlmruz\.blogspot\.com)?.*?\/.*?\?showComment\=[0-9]+\#c[0-9]+/.test(this.href);
		}).attr({'title':'Klik untuk memuat jawaban/pertanyaan sejenis','oncontextmenu':'return false'}).on("click", function(a1,a2) {
			a1 = this.href;
			a2 = a1.split('#');
			$(this).closest('.comment_body').html('<div class="loader" style="height:100px;background-position:50% 50%;"></div>').load(a2[0].split('?')[0]+' #'+a2[1], function() {
				$(this).closest('.comment_body').html().replaceWith($(this).html()+'<br><cite class="note">Tautan sumber: <a class="allow" href="'+a1+'">'+a1+'</a></cite><br>');
				$(this).find('.comment_child').remove();
			});
			return false;
		});