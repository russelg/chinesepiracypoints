<template>
  <div id="app">
    <form id="main" method="#" class="pure-form pure-form-aligned">
      <div class="pure-g">
        <div class="form pure-u-1 pure-u-md-1-2 pure-u-lg-1-2">
          <temp-form :inputs="inputs" :values="values" :dt="values.date"></temp-form>
        </div>
        <div class="form pure-u-1 pure-u-md-1-2 pure-u-lg-1-2">
          <fieldset>
            <legend>Add Media</legend>
            <div class="pure-control-group center">
              <button style="margin: 3px" v-for="i in mapping" type="button" class="pure-button pure-button-primary" @click="addMedia(Media[i])">Add new {{ i }}</button>
            </div>
          </fieldset>
          <fieldset v-for="m in media">
            <cd-form :media="m" :idx="parseInt($index)" v-if="m.media == Media.CD" :remove-media="removeMedia"></cd-form>
            <dvd-form :media="m" :idx="parseInt($index)" v-if="m.media == Media.DVD" :remove-media="removeMedia"></dvd-form>
            <bk-form :media="m" :idx="parseInt($index)" v-if="m.media == Media.BK" :remove-media="removeMedia"></bk-form>
          </fieldset>
          <temp-form :inputs="right_inputs" :values="values"></temp-form>
        </div>
      </div>
    </form>
    <modal v-if="showPost" :show.sync="showPost">
      <h3 slot="header">Contents</h3>
      <div slot="body">
        <div class="pure-control-group">
            <label for="title">Title</label>
            <textarea name="title">{{ getData().title }}</textarea>
        </div>
        <div class="pure-control-group">
            <label for="body">Body</label>
            <textarea name="Body">{{ getData().body }}</textarea>
        </div>
      </div>
      <div slot="footer">
        <button type="button" class="pure-button pure-button-primary" @click="showPost = false">Done</button>
      </div>
    </modal>
    <div class="center">
      <button class="pure-button pure-button-primary" @click="showPost = true" type="button">Generate Post</button>
    </div>
  </div>
</template>

<script>
var media = ["CD", "DVD", "BK"];

var Media = {};
media.map(function(itm, i) {
    Media[itm] = i;
});

export default {
  data () {
    return {
      inputs: [
        {
          name: "General",
          inputs: [
            {
              name: 'selfrip',
              type: 'checkbox',
              title: 'Selfrip?',
              default: true
            },
            {
              name: 'web',
              type: 'checkbox',
              title: 'WEB?',
              default: false
            },
            {
              name: 'artist',
              type: 'text',
              title: 'Artist:'
            },
            {
              name: 'title',
              type: 'text',
              title: 'Title:'
            },
            {
              name: 'date',
              type: 'date',
              title: 'Release Date:'
            },
            {
              name: 'cover',
              type: 'text',
              title: 'Cover URL:'
            },
            {
              name: 'homepage',
              type: 'text',
              title: 'Homepage URL:'
            },
            {
              name: 'label',
              type: 'text',
              title: 'Label:'
            },
            {
              name: 'catalog',
              type: 'text',
              title: 'Catalog Number:'
            },
            {
              name: 'desc',
              type: 'textarea',
              title: 'Description:'
            },
            {
              name: 'main_filetype',
              type: 'select',
              title: 'Audio Format:',
              options: [
                'WAV',
                'FLAC',
                'TAK',
                'MP3'
              ],
              default: 0
            },
            {
              name: 'cuefiles',
              type: 'checkbox',
              title: 'CUE(s) Included?',
              default: true,
              depends: function(values) {
                return !values.web;
              }
            },
            {
              name: 'event',
              type: 'checkbox',
              title: 'Event?'
            },
            {
              name: 'event_name',
              type: 'text',
              title: 'Event Name:',
              depends: 'event'
            }
          ]
        },
        {
          name: 'Proof',
          depends: function(values) {
            return !values.selfrip || values.web;
          },
          inputs: [
            {
              name: 'proof_url',
              type: 'text',
              title: 'Proof URL:'
            }
          ]
        },
        {
          name: 'Post Options',
          inputs: [
            {
              name: 'cost',
              type: 'number',
              title: 'Cost:',
              default: 3
            },
            {
              name: 'post_restrict',
              type: 'checkbox',
              title: 'Post Restriction?',
              default: true
            }
          ]
        }
      ],
      right_inputs: [
        {
          name: 'CD/s Link',
          inputs: [
            {
              name: 'file_url',
              type: 'text',
              title: 'URL:'
            },
            {
              name: 'file_pass',
              type: 'text',
              title: 'Password:'
            },
            {
              name: 'file_size',
              type: 'text',
              title: 'Size (MB):'
            }
          ]
        }
      ],
      values: {
        date: "2015-12-30"
      },
      Media: Media,
      mapping: media,
      media: [
        {
          media: Media.CD,
          tracks: '',
          log: ''
        }
      ],
      showPost: false
    }
  },
  methods: {
    removeMedia: function(id) {
      this.media.splice(id, 1);
    },
    addMedia: function(type) {
      var defaults = [
        {
          media: Media.CD,
          tracks: '',
          log: ''
        },
        {
          media: Media.DVD,
          tracks: '',
          url: '',
          password: '',
          size: '',
        },
        {
          media: Media.BK,
          dpi: 600,
          preview: '',
          url: '',
          password: '',
          size: ''
        }
      ]
      this.media.push(defaults[type]);
    },
    getData: function() {
      var date = window.rome(window.el).getMoment();
      var context = Object.assign({}, this.values, {media: this.media});
      this.$log();
      context.date = date;
      context.only_cds = context.media.filter(function(itm) {
        return itm.media === Media.CD;
      });
      context.only_dvd = context.media.filter(function(itm) {
        return itm.media === Media.DVD;
      });
      context.only_bk = context.media.filter(function(itm) {
        return itm.media === Media.BK;
      });
      context.scans = context.only_bk.length > 0;

      if (context.scans) context.scans_preview_url = context.only_bk[0].preview;

      context.only_discs = context.only_cds.concat(context.only_dvd);
      context.logs_present = context.only_cds.map(function(itm) {
        return itm.log != "";
      }).some(function(elem) {
        return elem === false;
      });

      if (context.web) context.cuefiles = false;

      var cdFormat = function cdFormat(context) {
        return (context.only_cds.length > 1 ? context.only_cds.length + '*' : '') + context.main_filetype + (context.cuefiles ? '+CUE' : '') + (context.logs_present ? '' : '+LOG');
      };

      var dvdFormat = function dvdFormat(context) {
        return context.only_dvd.length > 0 ? '/' + (context.only_dvd.length > 1 ? context.only_dvd.length + '*' : '') + 'ISO+MDS' : '';
      };

      var bkFormat = function bkFormat(context) {
        return context.only_bk.length > 0 ? '/BK' : '';
      };

      var getFormat = function getFormat(context) {
        return cdFormat(context) + dvdFormat(context) + bkFormat(context);
      };

      var getMedia = function getMedia(context) {
        var groups = context.media.filter(function(itm) {
          return itm.media !== Media.BK;
        }).map(function(itm) {
          return media[itm.media];
        }).reduce(function(prev, item) {
          if (item in prev) prev[item]++;
          else prev[item] = 1;
          return prev;
        }, {});
        return Object.keys(groups).map(function(itm) {
          return itm + '*' + groups[itm];
        }).join(', ');
      };

      var getDownloads = function getDownloads(context) {
        var dl = [];
        var format = cdFormat(context).replace('/', '');
        dl.push(Object.assign({}, {
          format: format,
          size: context.file_size,
          url: context.file_url,
          password: context.file_pass
        }));

        context.only_dvd.map(function(itm) {
          format = dvdFormat(context).replace('/', '');
          dl.push(Object.assign({}, itm, {
            format: format
          }));
        });

        context.only_bk.map(function(itm) {
          format = bkFormat(context).replace('/', '');
          dl.push(Object.assign({}, itm, {
            format: format
          }));
        });

        return dl;
      };

      var wrap = function wrap(chars, text) {
        var middle = Math.floor(chars.length / 2);
        var s1 = chars.substr(0, middle);
        var s2 = chars.substr(middle);

        return s1 + text + s2;
      };

      var buildTitle = function buildTitle(context) {
        var output = "[BD]";
        if (context.selfrip) {
          if (context.web) {
            output += "[自购]";
          } else {
            output += "[EAC/自抓]";
          }
        }
        if (context.event) {
          output += wrap('()', context.event_name);
        } else {
          output += wrap('[]', context.date.format("YYMMDD"));
        }
        output += wrap('  ', [context.artist, context.title].join(' - '));
        output += wrap('()', context.format);
        output += wrap('[]', context.total_size + 'MB');
        return output;
      };

      var bbCode = function bbCode(tag, content, optional) {
        optional = typeof optional === 'undefined' ? '' : optional;
        if (optional) optional = "=" + optional;
        return '[' + tag + optional + ']' + content + '[/' + tag + ']';
      };

      var buildPost = function buildPost(context) {
        // fucking chorme
        // var bb = Proxy.create({
        //     get: function (proxy, name) {
        //         return bbCode.bind(undefined, name);
        //     }
        // });
        var bb = {};
        ["b", "i", "u", "strike", "sub", "sup", "align", "blockquote", "list", "li", "pre", "code", "td", "tr", "table", "backcolor", "color", "size", "img", "url", "quote", "fold", "sell", "post", "font"].map(function(itm) {
          bb[itm] = bbCode.bind(undefined, itm);
        });
        var header = function header(text, colour) {
          colour = typeof colour === 'undefined' ? '#7ac3ec' : colour;
          return bb.b(bb.backcolor(bb.color(bb.size(text, 5), colour), "#000000"));
        };
        var output = [];
        output.push(bb.img(context.cover));
        if (context.scans) {
          output.push(bb.img(context.scans_preview_url));
        }
        output.push('');

        output.push(header("Homepage"));
        output.push(bb.url(context.homepage));

        var details = (function(context) {
          var _output = [];
          _output.push("标题: " + context.title);
          _output.push("演者: " + context.artist);
          if (context.label) {
            _output.push("出版者: " + context.label);
          }
          if (context.catalog) {
            _output.push("Cat#: " + context.catalog);
          }
          _output.push("发行日期: " + context.date.format("YYYY.MM.DD") + (context.event ? ' (' + context.event_name + ')' : ''));
          _output.push("版本特性: " + (context.web ? "Digital Download" : context.medium));
          _output.push("格式: " + context.format);
          if (context.desc) {
            _output.push("");
            _output.push(context.desc);
          }
          return _output.join("\n");
        })(context);

        output.push(bb.quote(details));
        output.push('');

        var media_header = function media_header(disc, discID) {
          return bb.b("Disc " + String(discID + 1) + " " + wrap('()', media[disc.media]));
        };

        output.push(header("収録曲"));
        context.only_discs.map(function(disc, discID) {
          if (context.only_discs.length > 1) output.push(media_header(disc, discID));
          output.push(bb.quote(disc.tracks));
          output.push('');
        });
        output.push('');

        output.push(header(context.web || !context.selfrip ? "PROOF" : "LOG"));
        if (context.web) {
          output.push(bb.fold(bb.img(context.proof_url)));
          output.push('');
        } else {
          context.only_cds.map(function(disc, discID) {
            output.push(media_header(disc, discID));
            output.push(bb.fold(bb.font(disc.log, "courier new,courier,monospace")));
            output.push('');
          });
        }
        output.push('');

        output.push(header("注意事项"));
        output.push(bb.b(bb.backcolor("Please ask before sharing or re-uploading elsewhere", "#cccccc")));
        output.push(bb.b(bb.backcolor("在重新分享或转载之前请联系我!", "#cccccc")));
        output.push('');

        output.push(header("Download Link"));
        var downloads = function downloads(context) {
          var _output = [];
          context.downloads.map(function(download, fileID) {
            var str = "";
            str += download.format + " ";
            if (download.media === Media.BK) str += wrap('()', 'PNG ' + download.dpi + 'dpi') + " ";
            str += wrap('()', String(download.size) + "MB") + ":";

            str = bb.b(str) + " ";

            str += bb.url(download.url) + " ";
            str += "Password: " + download.password;
            _output.push(str);
          });
          if (context.post_restrict) return bb.post(_output.join("\n"));

          return _output.join("\n");
        };
        output.push(bb.sell(downloads(context), context.cost));

        return output.join("\n");
      };
      context.format = getFormat(context);
      context.medium = getMedia(context);
      context.downloads = getDownloads(context);
      context.total_size = context.downloads.map(function(itm) {
        return parseInt(itm.size);
      }).reduce(function(a, b) {
        return a + b;
      });
      var title = buildTitle(context);
      var body = buildPost(context);
      return {
        title: title,
        body: body
      }
    }
  }
}
</script>