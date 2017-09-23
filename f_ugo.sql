/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50714
Source Host           : localhost:3306
Source Database       : f_ugo

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2017-09-11 16:28:00
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for goodbase
-- ----------------------------
DROP TABLE IF EXISTS `goodbase`;
CREATE TABLE `goodbase` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '商品货号',
  `img` varchar(255) CHARACTER SET utf8 DEFAULT 'imgs/goods/$.jpg' COMMENT '封面图',
  `name` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '标题',
  `price` float(10,0) DEFAULT '0' COMMENT '原价',
  `sale` float DEFAULT NULL COMMENT '现价',
  `tag` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '商品分类',
  `sale_num` bigint(20) DEFAULT '0' COMMENT '售出数量',
  `stock` int(1) DEFAULT '1' COMMENT '库存有无',
  `det` text CHARACTER SET utf8,
  `comments` int(255) DEFAULT '0',
  `seller` int(1) DEFAULT '0',
  `you` int(1) DEFAULT '1' COMMENT '是否有免运费',
  `time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=37 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of goodbase
-- ----------------------------
INSERT INTO `goodbase` VALUES ('1', 'imgs/goods/1.jpg', '怀山堂 铁棍山药红豆薏米粉·92条', '298', '298', 'BG02', '14009', '1', '本款商品选用山药、红豆和薏米，不含糖、添加剂和防腐剂，温补食养，即冲即饮，方便食用。', '3932', '0', '1', '2017-09-05 14:05:16');
INSERT INTO `goodbase` VALUES ('2', 'imgs/goods/2.jpg', '查特 法国原瓶康菲丝白葡萄酒·6瓶装', '408', '408', 'BG5', '872', '0', '', '33', '1', '1', '2015-04-13 13:54:23');
INSERT INTO `goodbase` VALUES ('3', 'imgs/goods/3.jpg', '一叶子 蜂王浆4D提拉面膜·42片', '299', '299', 'ADK02', '5624', '1', '轻松拥有蛇精脸！紧致提拉面膜,成就上镜小V脸！随时随地不惧约会”通告“,告别自拍神器,让皮肤向上“飞”！', '1994', '0', '1', '2017-09-05 14:07:54');
INSERT INTO `goodbase` VALUES ('4', 'imgs/goods/4.jpg', 'Pallaskr 家用餐具保洁柜38L·灰色', '499', '369', 'F2', '140', '1', '【买手说】广角开盖设计，一键式控制，可拆卸配件，高效节能，高兴排水系统，支持多种物品，安居家室，享受品质生活，爱家，如它，带来更贴心的呵护！', '357', '2', '0', '2017-05-09 14:19:14');
INSERT INTO `goodbase` VALUES ('5', 'imgs/goods/15.jpg', '瑞典ICA 水果混合口味麦片·3袋', '149', '149', 'BG1', '544', '1', '原装进口丰富谷物，非油炸可搭配牛奶、酸奶、冰淇淋食用，超值组合更优惠', '4', '0', '1', '2015-10-19 14:19:14');
INSERT INTO `goodbase` VALUES ('6', 'imgs/goods/6.jpg', '福库 原装进口钛金蜂窝IH5L电饭煲', '2380', '1799', 'F2', '24', '1', null, '1008', '1', '1', '2017-03-07 14:25:52');
INSERT INTO `goodbase` VALUES ('7', 'imgs/goods/7.jpg', '韩后 乳清蛋白限时回馈·7件组', '199', '199', 'AD02', '10707', '1', null, '739', '0', '1', '2017-03-07 14:34:48');
INSERT INTO `goodbase` VALUES ('8', 'imgs/goods/21.jpg', '台湾 养白速攻型酵素·600ml', '398', '398', 'G2', '447', '1', '【买手说】这款速攻型酵素由8色88种蔬菜水果酿造而成，台湾原装进口，口碑一直很不错', '104', '1', '1', '2015-11-04 14:41:26');
INSERT INTO `goodbase` VALUES ('9', 'imgs/goods/20.jpg', '卫龙 大面筋·10袋组', '39', '32', 'G3', '1000', '1', '卫龙大面筋，带给您由里及外的辣爽，让味蕾跳跃，垂涎三尺，工作之余和日常佐餐陪伴，冷静、约吗、压惊、任性到底。', '60', '2', '0', '2017-04-27 14:45:45');
INSERT INTO `goodbase` VALUES ('10', 'imgs/goods/22.jpg', '德国米技 炉爆炒王升级款·6件组', '1499', '1499', 'F03', '3130', '1', '', '244', '0', '1', '2017-01-07 14:49:39');
INSERT INTO `goodbase` VALUES ('11', 'imgs/goods/11.jpg', 'SWISSWIN 优选24英寸拉杆箱套组+1个双肩包·酒红色', '399', '399', 'AI02', '4319', '1', '金属拉杆，耐用，抗撞击，高度自由调节；箱体为PC材质，轻薄柔韧，受到撞击迅速回弹不易破损', '289', '0', '1', '2016-08-04 14:53:08');
INSERT INTO `goodbase` VALUES ('12', 'imgs/goods/12.jpg', '华翠缘 水滴形蜜蜡吊坠', '2580', '1999', 'J2', '35', '0', '水滴形蜜蜡吊坠配琥珀彩虹链，典雅大气。蜜蜡形成于数千万年前，是近些年非常流行的有机宝石。', '14', '0', '1', '2017-02-28 14:57:54');
INSERT INTO `goodbase` VALUES ('13', 'imgs/goods/13.jpg', '一朵莲 纤体梅加量·10粒*8盒', '199', '199', 'BG02', '1407', '1', '美味可口,益身轻松', '43', '1', '1', '2013-03-05 14:05:16');
INSERT INTO `goodbase` VALUES ('14', 'imgs/goods/14.jpg', '运得牌 荔枝味含气饮料·350ml*12瓶(Z990315177)', '79', '79', 'BG3', '900', '0', '马来西亚Glinter果味含气饮料，口味多样，喝起来甜香、清爽，受到青少年特别偏爱，夏季冰爽中带有水果的淡淡清香。运德饮料给你带来非一般的酷爽享受！', '1', '2', '0', '2017-07-10 13:54:23');
INSERT INTO `goodbase` VALUES ('15', 'imgs/goods/3.jpg', '一叶子 蜂王浆4D提拉面膜·42片', '299', '299', 'ADK02', '5624', '1', '轻松拥有蛇精脸！紧致提拉面膜,成就上镜小V脸！随时随地不惧约会”通告“,告别自拍神器,让皮肤向上“飞”！', '1994', '0', '1', '2017-09-05 14:07:54');
INSERT INTO `goodbase` VALUES ('16', 'imgs/goods/25.jpg', '多燕瘦 蔬果酵素益生菌水果片·4+2件组', '298', '199', 'BG2', '566', '1', '出游时方便携带', '287', '1', '1', '2016-06-27 14:13:04');
INSERT INTO `goodbase` VALUES ('17', 'imgs/goods/16.jpg', '澳洲 德运Devondale全脂脱脂高钙速溶奶粉·1kg*2', '169', '169', 'BG2', '117', '1', '生态牧场、优质奶源、营养高钙、容易冲泡 奶香浓郁', '8', '2', '1', '2017-04-25 14:19:14');
INSERT INTO `goodbase` VALUES ('18', 'imgs/goods/24.jpg', 'HIGHCOOK韩库 蓝宝石系列炒锅32cm', '299', '259', 'F2', '177', '1', '韩国进口炒锅， 升级32cm大容量 ，荷包蛋也像在打滑梯的无烟不粘炒锅· 升级变色控烟锅把手 ，有效控烟。韩库渗透技术 （无有害涂层） ，蓝宝石般坚固耐用。 搭配可立防溢盖子，有效节省空间，适应多种热源。', '146', '1', '1', '2016-02-24 14:25:52');
INSERT INTO `goodbase` VALUES ('19', 'imgs/goods/23.jpg', '汤臣倍健 蛋白粉促销装特供礼盒', '228', '228', 'BG2', '227', '1', '补充蛋白质', '85', '1', '1', '2017-02-27 14:34:48');
INSERT INTO `goodbase` VALUES ('20', 'imgs/goods/8.jpg', '吕 臻参宝洗发水·8瓶+护发乳2瓶', '299', '299', 'K2', '223', '1', '综合解决头皮、头发问题，从健康的头皮开始重获丰盈亮泽的秀发，打造更自信完美的你。强韧发根，提亮发泽，完善头皮问题（敏感性头皮，油性头皮，干性头皮），一次解决多重问题，再现健康头皮，美丽秀发.', '34', '1', '1', '2016-12-06 14:41:26');
INSERT INTO `goodbase` VALUES ('21', 'imgs/goods/19.jpg', '纽仕兰 新西兰原装进口全脂牛奶·2箱', '136', '116', 'G2', '789', '1', '29个新西兰自有牧场，统一管理，品质可控，无环境污染，不打催奶素； 6亩地一头牛，自然放牧，自然牧草，可循环原生态植被；', '111', '1', '0', '2017-04-14 14:45:45');
INSERT INTO `goodbase` VALUES ('22', 'imgs/goods/10.jpg', '七彩枫叶金丝绒休闲服超值2套组（单套仅约150元）', '298', '298', 'EI3', '42', '1', '1.采用高档重磅金丝绒面料，悬垂性好，细腻、柔软、平整、顺滑，不起球，不起静电 2.韩国时尚版型设计，立体裁剪纺织技术，既舒适又有型， 3.背后独特的烫钻设计，倍感时尚和奢华。4.适用人群范围、穿着场合广，面料大，舒适版型，适合各种身材，年轻人可平时休闲穿着，老年人也可穿着跳广场舞 5.性价比超高', '1000', '0', '1', '2016-06-09 14:49:39');
INSERT INTO `goodbase` VALUES ('23', 'imgs/goods/11.jpg', 'SWISSWIN 优选24英寸拉杆箱套组+1个双肩包·酒红色', '399', '399', 'AI02', '4319', '1', '金属拉杆，耐用，抗撞击，高度自由调节；箱体为PC材质，轻薄柔韧，受到撞击迅速回弹不易破损', '289', '0', '1', '2016-08-04 14:53:08');
INSERT INTO `goodbase` VALUES ('24', 'imgs/goods/12.jpg', '华翠缘 水滴形蜜蜡吊坠', '2580', '1999', 'J2', '35', '0', '水滴形蜜蜡吊坠配琥珀彩虹链，典雅大气。蜜蜡形成于数千万年前，是近些年非常流行的有机宝石。', '14', '0', '1', '2017-02-28 14:57:54');
INSERT INTO `goodbase` VALUES ('25', 'imgs/goods/18.jpg', '天兴 酥软甘甜的蜂巢蜜3+3组合套装', '258', '258', 'BG2', '300', '0', '蜂巢蜜嚼着吃的蜂蜜，酥软甘甜颊齿留香。', '134', '1', '1', '2016-04-22 14:05:16');
INSERT INTO `goodbase` VALUES ('26', 'imgs/goods/17.jpg', '【包邮】美国进口瑞士小姐牛奶巧克力味冲饮粉4盒', '158', '158', 'BG1', '67', '1', '美国原装进口，甜蜜时光好伴侣！', '30', '2', '0', '2017-03-09 13:54:23');
INSERT INTO `goodbase` VALUES ('27', 'imgs/goods/3.jpg', '一叶子 蜂王浆4D提拉面膜·42片', '299', '299', 'ADK02', '5624', '1', '轻松拥有蛇精脸！紧致提拉面膜,成就上镜小V脸！随时随地不惧约会”通告“,告别自拍神器,让皮肤向上“飞”！', '1994', '0', '1', '2017-09-05 14:07:54');
INSERT INTO `goodbase` VALUES ('28', 'imgs/goods/27.jpg', '德国双立人 Twin Point S 刀具·5件套', '548', '499', 'F2', '1147', '1', '刀具5件套可满足一般家庭所需；中片刀、多用刀、果蔬刀、剪刀都是厨房中常用刀具。刀柄上银色双立人logo彰显高端品质；双立人不锈钢采用的冲压技术，使刀身坚固硬度与锐利。', '76', '1', '1', '2015-09-07 14:13:04');
INSERT INTO `goodbase` VALUES ('29', 'imgs/goods/5.jpg', '韩愢 生态鲜花3D泡泡染护栗棕色·8件', '268', '268', 'ADK01', '650', '1', '植物鲜花健康染发，颜色靓丽润泽，发丝柔顺飘逸。精明女人的囤货之选。让健康染发剂给你换个颜色换个好心情。', '2113', '0', '1', '2015-10-19 14:19:14');
INSERT INTO `goodbase` VALUES ('30', 'imgs/goods/26.jpg', 'SIMELO施美乐 印象京都高硼硅电热水壶超值套组.4件', '299', '289', 'F2', '724', '1', null, '33', '1', '1', '2017-06-27 14:25:52');
INSERT INTO `goodbase` VALUES ('31', 'imgs/goods/7.jpg', '韩后 乳清蛋白限时回馈·7件组', '199', '199', 'AD02', '10707', '1', null, '739', '0', '1', '2017-03-07 14:34:48');
INSERT INTO `goodbase` VALUES ('32', 'imgs/goods/8.jpg', '吕 臻参宝洗发水·8瓶+护发乳2瓶', '299', '299', 'K2', '223', '1', '综合解决头皮、头发问题，从健康的头皮开始重获丰盈亮泽的秀发，打造更自信完美的你。强韧发根，提亮发泽，完善头皮问题（敏感性头皮，油性头皮，干性头皮），一次解决多重问题，再现健康头皮，美丽秀发.', '34', '1', '1', '2016-12-06 14:41:26');
INSERT INTO `goodbase` VALUES ('33', 'imgs/goods/9.jpg', '阿尔帝蒸食代澳洲牛肉罐头', '298', '298', 'G2', '7464', '1', null, '210', '0', '1', '2017-05-15 14:45:45');
INSERT INTO `goodbase` VALUES ('34', 'imgs/goods/10.jpg', '七彩枫叶金丝绒休闲服超值2套组（单套仅约150元）', '298', '298', 'EI3', '42', '1', '1.采用高档重磅金丝绒面料，悬垂性好，细腻、柔软、平整、顺滑，不起球，不起静电 2.韩国时尚版型设计，立体裁剪纺织技术，既舒适又有型， 3.背后独特的烫钻设计，倍感时尚和奢华。4.适用人群范围、穿着场合广，面料大，舒适版型，适合各种身材，年轻人可平时休闲穿着，老年人也可穿着跳广场舞 5.性价比超高', '1000', '0', '1', '2016-06-09 14:49:39');
INSERT INTO `goodbase` VALUES ('35', 'imgs/goods/11.jpg', 'SWISSWIN 优选24英寸拉杆箱套组+1个双肩包·酒红色', '399', '399', 'AI02', '4319', '1', '金属拉杆，耐用，抗撞击，高度自由调节；箱体为PC材质，轻薄柔韧，受到撞击迅速回弹不易破损', '289', '0', '1', '2016-08-04 14:53:08');
INSERT INTO `goodbase` VALUES ('36', 'imgs/goods/12.jpg', '华翠缘 水滴形蜜蜡吊坠', '2580', '1999', 'J2', '35', '0', '水滴形蜜蜡吊坠配琥珀彩虹链，典雅大气。蜜蜡形成于数千万年前，是近些年非常流行的有机宝石。', '14', '0', '1', '2017-02-28 14:57:54');

-- ----------------------------
-- Table structure for goodcomm
-- ----------------------------
DROP TABLE IF EXISTS `goodcomm`;
CREATE TABLE `goodcomm` (
  `id` bigint(20) NOT NULL COMMENT '商品货号',
  `user` bigint(20) NOT NULL COMMENT '评论用户账号',
  `time` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '评论时间',
  `score` int(1) NOT NULL DEFAULT '0' COMMENT '评分',
  `content` text COMMENT '评论内容',
  `imgs` text COMMENT '评论配图',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of goodcomm
-- ----------------------------

-- ----------------------------
-- Table structure for gooddetails
-- ----------------------------
DROP TABLE IF EXISTS `gooddetails`;
CREATE TABLE `gooddetails` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '商品货号',
  `imgs` text CHARACTER SET utf8 COMMENT '众小图',
  `size` text CHARACTER SET utf8 COMMENT '商品规格',
  `seller` int(1) NOT NULL DEFAULT '0' COMMENT '商家 0-tv 1-官网直供 2-他网直供',
  `brand` text CHARACTER SET utf8 COMMENT '品牌',
  `href` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '品牌官网',
  `time` datetime NOT NULL COMMENT '商品上架时间',
  `comments` int(11) DEFAULT '0' COMMENT '评论数目',
  `param` text CHARACTER SET utf8 COMMENT '参数',
  `list` text CHARACTER SET utf8 COMMENT '包装清单',
  `de_imgs` text CHARACTER SET utf8 COMMENT '详情介绍图',
  `free` text CHARACTER SET utf8 COMMENT '赠品优惠',
  `sub` text CHARACTER SET utf8,
  `deli` text CHARACTER SET utf8,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=37 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of gooddetails
-- ----------------------------
INSERT INTO `gooddetails` VALUES ('1', 'imgs/goods/de/1_1.jpg;imgs/goods/de/1_2.jpg;imgs/goods/de/1_3.jpg;imgs/goods/de/1_4.jpg;imgs/goods/de/1_5.jpg;imgs/goods/de/1_6.jpg;imgs/goods/de/1_7.jpg;', '', '0', '怀山堂', 'http://www.ugoshop.com/brand_2599.html?tp=DetailPage.1', '2017-09-05 14:05:16', '3932', '材质：铁棍牌山药、红豆、薏米@规格：12克/条', '怀山堂铁棍山药红豆薏米粉12克*10条/盒*9*盒 怀山堂铁棍山药红豆薏米粉12克*2*条', 'imgs/goods/intro/1_1.png', null, 'TV商品下单立减10元', '订单金额满168元包邮');
INSERT INTO `gooddetails` VALUES ('2', 'imgs/goods/de/2_1.jpg;imgs/goods/de/2_2.jpg;imgs/goods/de/2_3.jpg;imgs/goods/de/2_4.jpg;imgs/goods/de/2_5.jpg;imgs/goods/de/2_6.jpg;imgs/goods/de/2_7.jpg;', null, '1', '查特', 'http://www.ugoshop.com/brand_2363.html?tp=DetailPage.1', '2015-04-13 13:54:23', '33', '材质：葡萄汁@规格：750ml*6@颜色：酒红色', '主品配置：法国查特康菲丝白葡萄酒750ml*6 赠品：双礼袋*3，海马刀*1', 'imgs/goods/intro/2_1.png', null, null, '订单金额满168元包邮');
INSERT INTO `gooddetails` VALUES ('3', 'imgs/goods/de/3_1.jpg;imgs/goods/de/3_2.jpg;imgs/goods/de/3_3.jpg;imgs/goods/de/3_4.jpg;imgs/goods/de/3_5.jpg;imgs/goods/de/3_6.jpg;imgs/goods/de/3_7.jpg;', null, '0', '一叶子', 'http://www.ugoshop.com/brand_794.html?tp=DetailPage.1', '2017-09-05 14:07:54', '1994', '材质/成份：乳液、塑料、纸@商品颜色：金色 @商品净重（Kg）：0.2 @商品尺寸 (长宽高  cm)：12.8*6.6*19.3 @品牌：一叶子@原产地：中国.苏州@制造商：苏州工业园区黎姿化妆品有限公司', '主品配置：一叶子蜂王浆紧致塑颜面膜40ml/片*10片*4*盒@赠品配置：一叶子蜂王浆紧致塑颜面膜40ml*2*片', 'imgs/goods/intro/3_1.png', null, 'TV商品下单立减10元', '订单金额满168元包邮');
INSERT INTO `gooddetails` VALUES ('4', 'imgs/goods/de/4_1.jpg;imgs/goods/de/4_2.jpg;imgs/goods/de/4_3.jpg;imgs/goods/de/4_4.jpg;imgs/goods/de/4_5.jpg;imgs/goods/de/4_6.jpg;imgs/goods/de/4_7.jpg;', null, '1', 'PALLAS', 'http://www.ugoshop.com/brand_991.html?tp=DetailPage.1', '2016-07-21 14:13:04', '357', '颜色：灰色 材质：PPS、ABS 重量：7KG 外包规格：56.6*45.2*40.2CM@刀片数：8个@产地：广东中山', '保洁柜主机*1*个 不锈钢餐具篮*1*个 奶瓶架*1*个 筷架笼*1*个 说明书*1*个 不锈钢接水盘*1*个', 'imgs/goods/intro/4_1.png', null, null, null);
INSERT INTO `gooddetails` VALUES ('5', 'imgs/goods/de/15_1.jpg;imgs/goods/de/15_2.jpg;imgs/goods/de/15_3.jpg;imgs/goods/de/15_4.jpg;imgs/goods/de/15_5.jpg;imgs/goods/de/15_6.jpg;', null, '2', 'ICA', 'http://www.ugoshop.com/brand_4841.html?tp=DetailPage.1', '2017-05-09 14:19:14', '4', '商品：水果麦片3袋@规格：瑞典ICA 蓝莓蔓越莓覆盆子麦片500g*2袋+45%混合水果坚果750g*1袋@@保质期：1年', '瑞典ICA 蓝莓蔓越莓覆盆子麦片500g*2袋+45%混合水果坚果750g*1袋', 'imgs/goods/intro/15_1.png', '', '', '');
INSERT INTO `gooddetails` VALUES ('6', 'imgs/goods/de/6_1.jpg;imgs/goods/de/6_1.jpg;imgs/goods/de/6_1.jpg;imgs/goods/de/6_1.jpg;', null, '1', '福库', 'http://www.ugoshop.com/brand_575.html?tp=DetailPage.1', '2017-03-07 14:25:52', '1008', '品牌：CUCKOO/福库 容量: 5L 内胆材质: 钛金聚能内胆 加热方式: 三维立体加热 净重：8.9KG 产地：韩国', '\r\n主机*1*个 内胆*1*个 饭勺*1*个 蒸架*1*个 量杯*1*个 料理书*1*个 说明书*1*个 透气针*1*个', 'imgs/goods/intro/6_1.png', null, null, '订单金额满168元包邮');
INSERT INTO `gooddetails` VALUES ('7', 'imgs/goods/de/7_1.jpg;imgs/goods/de/7_2.jpg;imgs/goods/de/7_3.jpg;imgs/goods/de/7_4.jpg;imgs/goods/de/7_5.jpg;imgs/goods/de/7_6.jpg;imgs/goods/de/7_7.jpg;', null, '0', '韩后', 'http://www.ugoshop.com/brand_664.html?tp=DetailPage.1', '2017-03-07 14:34:48', '739', '\r\n商品品牌：韩后@商品配置：主品：乳清蛋白蓓润美容液120ml*2个@乳清蛋白蓓润精华液30ml*2个@ 乳清蛋白蓓润霜40g*2个@ 试用装：乳清蛋白倍润美容液1ml*1个@乳清蛋白倍润精华液1ml*1个@ 乳清蛋白倍润霜1g*1个', '乳清蛋白蓓润美容液120ml*2*个 乳清蛋白蓓润精华液30ml*2*个 乳清蛋白蓓润霜40g*2*个 试用装：乳清蛋白倍润美容液1ml*1*个 试用装：乳清蛋白倍润精华液1ml*1*个 试用装：乳清蛋白倍润霜1g*1*个', 'imgs/goods/intro/7_1.png', null, 'TV商品下单立减10元', '订单金额满168元包邮');
INSERT INTO `gooddetails` VALUES ('8', 'imgs/goods/de/21_1.jpg;imgs/goods/de/21_2.jpg;imgs/goods/de/21_3.jpg;imgs/goods/de/21_4.jpg;imgs/goods/de/21_5.jpg;imgs/goods/de/21_6.jpg;imgs/goods/de/21_7.jpg;', null, '1', '养白', 'http://www.ugoshop.com/brand_2040.html?tp=DetailPage.1', '2015-11-04 14:41:26', '104', '', '速攻型酵素*1*瓶', 'imgs/goods/intro/21_1.png', null, null, '订单金额满168元包邮');
INSERT INTO `gooddetails` VALUES ('9', 'imgs/goods/de/20_1.jpg;imgs/goods/de/20_2.jpg;imgs/goods/de/20_3.jpg;imgs/goods/de/20_4.jpg;imgs/goods/de/20_5.jpg;', null, '2', '卫龙', '', '2017-04-27 14:45:45', '60', '材质：辣条@规格：106g*10袋@产地：河南漯河@保质期：120天', '卫龙大辣条106g*10袋', 'imgs/goods/intro/20_1.png', null, '', '');
INSERT INTO `gooddetails` VALUES ('10', 'imgs/goods/de/22_1.jpg;imgs/goods/de/22_2.jpg;imgs/goods/de/22_3.jpg;imgs/goods/de/22_4.jpg;imgs/goods/de/22_5.jpg;imgs/goods/de/22_6.jpg;imgs/goods/de/22_7.jpg;', null, '0', '德国米技', 'http://www.ugoshop.com/brand_2249.html?tp=DetailPage.1', '2017-01-07 14:49:39', '244', '101,10,米技炉,miji gala IEE2100FI', '主品配置：@米技炉 1 个（单圈）说明书*1 ，保修卡*1，合格证*1@赠品配置：@米技26cm煎炒锅 1 口 、米技24cm汤锅 1 口 、米技24cm蒸格 1 口 、米技26cm煎炒锅锅盖 1 个、米技24cm汤锅锅盖 1 个', 'imgs/goods/intro/22_1.png', null, 'TV商品下单立减10元', '订单金额满168元包邮');
INSERT INTO `gooddetails` VALUES ('11', 'imgs/goods/de/11_1.jpg;imgs/goods/de/11_2.jpg;imgs/goods/de/11_3.jpg;imgs/goods/de/11_4.jpg;imgs/goods/de/11_5.jpg;imgs/goods/de/11_6.jpg;imgs/goods/de/11_7.jpg;', null, '0', 'SWISSWIN（瑞士军刀）', 'http://www.ugoshop.com/brand_1818.html?tp=DetailPage.1', '2016-08-04 14:53:08', '289', '商品型号/规格/款式：45*28*66cm   @材质/成份：PC+涤纶  @轮子：尼龙+TPU@商品颜色：灰色、酒红色@商品净重（Kg）：2.72@商品尺寸 (长宽高  cm)：24英寸拉杆箱：45*28*66cm@双肩包：46*31*18cm   @品牌：swisswin @原产地：福建福清    @制造商：骏洋（福建）旅游用品有限公司 @适用季节：春夏秋冬@适用人群年龄段：18-65 @适用人群性别：老中青', '商品配置：24英寸拉杆箱*1*个 双肩包*1*个', 'imgs/goods/intro/11_1.png', null, 'TV商品下单立减10元', '订单金额满168元包邮');
INSERT INTO `gooddetails` VALUES ('12', 'imgs/goods/de/12_1.jpg;imgs/goods/de/12_2.jpg;imgs/goods/de/12_3.jpg;imgs/goods/de/12_4.jpg;imgs/goods/de/12_5.jpg;imgs/goods/de/12_6.jpg;', null, '0', '华翠缘', 'http://www.ugoshop.com/brand_5136.html?tp=DetailPage.1', '2017-02-28 14:57:54', '14', '材质：蜜蜡@吊坠尺寸约：35*25*15，重10g以上（含链）', '水滴形蜜蜡吊坠*1*件 鉴定证书*1*张', 'imgs/goods/intro/12_1.png', null, null, '订单金额满168元包邮');
INSERT INTO `gooddetails` VALUES ('13', 'imgs/goods/de/13_1.jpg;imgs/goods/de/13_2.jpg;imgs/goods/de/13_3.jpg;imgs/goods/de/13_4.jpg;imgs/goods/de/13_5.jpg;imgs/goods/de/13_6.jpg;imgs/goods/de/13_7.jpg;', '', '1', '一朵莲', 'http://www.ugoshop.com/brand_1368.html?tp=DetailPage.1', '2013-03-05 14:05:16', '43', '商品尺寸：14cm*7cm*8cm@配料/成份:糖渍青梅（青梅、白砂糖、食用盐）、低聚木糖、抹茶粉、荷叶粉@产品重量:0.5kg@规格:10g*10粒*8盒  @颜色：彩色@原产地:厦门@保质期：24个月', '商品配置：一朵莲纤体梅8盒（10g*10粒*8盒）', 'imgs/goods/intro/13_1.png', null, '', '订单金额满168元包邮');
INSERT INTO `gooddetails` VALUES ('14', 'imgs/goods/de/14_1.jpg;imgs/goods/de/14_2.jpg;imgs/goods/de/14_3.jpg;imgs/goods/de/14_4.jpg;', null, '2', '其他', null, '2017-07-10 13:54:23', '1', '产品名称：运得牌荔枝味含气饮料350ml@产品规格：350ml*12@@保质期：365天', '350ml*12', 'imgs/goods/intro/14_1.png', null, null, null);
INSERT INTO `gooddetails` VALUES ('15', 'imgs/goods/de/3_1.jpg;imgs/goods/de/3_2.jpg;imgs/goods/de/3_3.jpg;imgs/goods/de/3_4.jpg;imgs/goods/de/3_5.jpg;imgs/goods/de/3_6.jpg;imgs/goods/de/3_7.jpg;', null, '0', '一叶子', 'http://www.ugoshop.com/brand_794.html?tp=DetailPage.1', '2017-09-05 14:07:54', '1994', '材质/成份：乳液、塑料、纸@商品颜色：金色 @商品净重（Kg）：0.2 @商品尺寸 (长宽高  cm)：12.8*6.6*19.3 @品牌：一叶子@原产地：中国.苏州@制造商：苏州工业园区黎姿化妆品有限公司', '主品配置：一叶子蜂王浆紧致塑颜面膜40ml/片*10片*4*盒@赠品配置：一叶子蜂王浆紧致塑颜面膜40ml*2*片', 'imgs/goods/intro/3_1.png', null, 'TV商品下单立减10元', '订单金额满168元包邮');
INSERT INTO `gooddetails` VALUES ('16', 'imgs/goods/de/25_1.jpg;imgs/goods/de/25_2.jpg;imgs/goods/de/25_3.jpg;imgs/goods/de/25_4.jpg;imgs/goods/de/25_5.jpg;imgs/goods/de/25_6.jpg;imgs/goods/de/25_7.jpg;', null, '1', '多燕瘦', 'http://www.ugoshop.com/brand_4442.html?tp=DetailPage.1', '2016-06-27 14:13:04', '287', '品牌: 多燕瘦 名称：益生菌水果片 储藏方法：密封、置阴凉干燥处 注意事项：孕妇、哺乳期妇女及婴幼儿慎用 食用方法：建议每天食用4~6片，每次2片 厂名：广州肯定医药科技有限公司 保质期：24个月', '酵素益生菌水果片60粒*4*瓶 酵素益生菌水果片20粒*2*瓶', 'imgs/goods/intro/25_1.png', null, null, '订单金额满168元包邮');
INSERT INTO `gooddetails` VALUES ('17', 'imgs/goods/de/16_1.jpg;imgs/goods/de/16_2.jpg;imgs/goods/de/16_3.jpg;imgs/goods/de/16_4.jpg;', null, '2', '其它', '', '2017-04-25 14:19:14', '8', '配置：全脂奶粉1kg*1袋 脱脂奶粉1kg*1袋@产地：澳大利亚 @保质期：1年', '全脂高钙乳粉1kg*1 脱脂高钙乳粉1kg*1', 'imgs/goods/intro/16_1.png', '', '', '订单金额满168元包邮');
INSERT INTO `gooddetails` VALUES ('18', 'imgs/goods/de/24_1.jpg;imgs/goods/de/24_2.jpg;imgs/goods/de/24_3.jpg;imgs/goods/de/24_4.jpg;imgs/goods/de/24_5.jpg;imgs/goods/de/24_6.jpg;imgs/goods/de/24_7.jpg;', null, '1', '韩库', 'http://www.ugoshop.com/brand_4123.html?tp=DetailPage.1', '2016-02-24 14:25:52', '146', '炒锅口径32cm,深度9.5cm,重量1.15kg,厚度3mm，盖子重量1.02kg,适合3-8口人使用', '炒锅*1*个', 'imgs/goods/intro/24_1.png', null, null, '订单金额满168元包邮');
INSERT INTO `gooddetails` VALUES ('19', 'imgs/goods/de/23_1.jpg;imgs/goods/de/23_2.jpg;imgs/goods/de/23_3.jpg;imgs/goods/de/23_4.jpg;imgs/goods/de/23_5.jpg;imgs/goods/de/23_6.jpg;imgs/goods/de/23_7.jpg;', null, '1', '汤臣倍健', 'http://www.ugoshop.com/brand_48.html?tp=DetailPage.1', '2017-02-27 14:34:48', '85', '品牌：汤臣倍健 @保质期：24个月 @产地：广东', '汤臣倍健蛋白粉促销装特供礼盒（600g+摇摇杯）*1*组', 'imgs/goods/intro/23_1.png', null, '', '订单金额满168元包邮');
INSERT INTO `gooddetails` VALUES ('20', 'imgs/goods/de/8_1.jpg;imgs/goods/de/8_2.jpg;imgs/goods/de/8_3.jpg;imgs/goods/de/8_4.jpg;imgs/goods/de/8_5.jpg;imgs/goods/de/8_6.jpg;imgs/goods/de/8_7.jpg;', null, '1', '吕', 'http://www.ugoshop.com/brand_2087.html?tp=DetailPage.1', '2016-12-06 14:41:26', '34', '商品名称：吕臻萃恒护多效洗护六件套 品牌：吕 分类：美妆洗护护理 功效：滋养秀发 退货政策：不影响二次销售 颜色：黑色 规格：吕臻萃恒护多效洗发水400g*3*瓶 吕臻萃恒护多效发膜300ml*3*瓶 吕臻参葆凝时焕活洗发乳100g*1*瓶 吕臻参葆凝时焕活护发乳100ml*1*瓶 原产国家：韩国 适用人群：不限 产品包装：有盒塑封 限期使用日期：见包装', '吕臻萃恒护多效洗发水400g*3*瓶 吕臻萃恒护多效发膜300ml*3*瓶 臻参葆凝时焕活洗发水 100g*1*瓶 吕 臻参葆凝时焕活护发乳 100ml*1*瓶', 'imgs/goods/intro/8_1.png', null, null, '订单金额满168元包邮');
INSERT INTO `gooddetails` VALUES ('21', 'imgs/goods/de/19_1.jpg;imgs/goods/de/19_2.jpg;imgs/goods/de/19_3.jpg;imgs/goods/de/19_4.jpg;imgs/goods/de/19_5.jpg;imgs/goods/de/19_6.jpg;imgs/goods/de/19_7.jpg;', null, '1', '纽仕兰', 'http://www.ugoshop.com/brand_3783.html?tp=DetailPage.1', '2017-04-14 14:45:45', '111', '厂名：Milk New Zealand Dairy 厂址：新西兰 厂家联系方式：8009880533 配料表：100%生牛乳 储藏方法：常温保存，开启后需冷藏 保质期：365 天  配置: 10x250ml/箱*2箱 包装方式: 包装 包装种类: 箱 品牌: The land/纽仕兰 系列: 全脂3.8g整箱系列 是否为有机食品: 否 饮品种类: 全脂牛奶 产地: 新西兰 套餐份量: 1人 适用对象: 儿童 常人 老年 女 青少年 是否进口: 进口 单件规格: 250mL', '新西兰纽仕兰原装进口全脂牛奶2箱*1*组', 'imgs/goods/intro/19_1.png', null, '', '');
INSERT INTO `gooddetails` VALUES ('22', 'imgs/goods/de/10_1.jpg;imgs/goods/de/10_2.jpg;imgs/goods/de/10_3.jpg;imgs/goods/de/10_4.jpg;imgs/goods/de/10_5.jpg;imgs/goods/de/10_6.jpg;imgs/goods/de/10_7.jpg;', null, '0', '七彩枫叶', null, '2016-06-09 14:49:39', '1000', '产地：中国型号：M/L/XL 材质:90%聚酯纤维10%氨纶颜色：紫色、玫粉色', '高贵紫金丝绒休闲套装（上衣+裤子）*1*套 玫红金丝绒休闲套装（上衣+裤子）*1*套', 'imgs/goods/intro/10_1.png', null, null, '订单金额满168元包邮');
INSERT INTO `gooddetails` VALUES ('23', 'imgs/goods/de/11_1.jpg;imgs/goods/de/11_2.jpg;imgs/goods/de/11_3.jpg;imgs/goods/de/11_4.jpg;imgs/goods/de/11_5.jpg;imgs/goods/de/11_6.jpg;imgs/goods/de/11_7.jpg;', null, '0', 'SWISSWIN（瑞士军刀）', 'http://www.ugoshop.com/brand_1818.html?tp=DetailPage.1', '2016-08-04 14:53:08', '289', '商品型号/规格/款式：45*28*66cm   @材质/成份：PC+涤纶  @轮子：尼龙+TPU@商品颜色：灰色、酒红色@商品净重（Kg）：2.72@商品尺寸 (长宽高  cm)：24英寸拉杆箱：45*28*66cm@双肩包：46*31*18cm   @品牌：swisswin @原产地：福建福清    @制造商：骏洋（福建）旅游用品有限公司 @适用季节：春夏秋冬@适用人群年龄段：18-65 @适用人群性别：老中青', '商品配置：24英寸拉杆箱*1*个 双肩包*1*个', 'imgs/goods/intro/11_1.png', null, 'TV商品下单立减10元', '订单金额满168元包邮');
INSERT INTO `gooddetails` VALUES ('24', 'imgs/goods/de/12_1.jpg;imgs/goods/de/12_2.jpg;imgs/goods/de/12_3.jpg;imgs/goods/de/12_4.jpg;imgs/goods/de/12_5.jpg;imgs/goods/de/12_6.jpg;', null, '0', '华翠缘', 'http://www.ugoshop.com/brand_5136.html?tp=DetailPage.1', '2017-02-28 14:57:54', '14', '材质：蜜蜡@吊坠尺寸约：35*25*15，重10g以上（含链）', '水滴形蜜蜡吊坠*1*件 鉴定证书*1*张', 'imgs/goods/intro/12_1.png', null, null, '订单金额满168元包邮');
INSERT INTO `gooddetails` VALUES ('25', 'imgs/goods/de/18_1.jpg;imgs/goods/de/18_2.jpg;imgs/goods/de/18_3.jpg;imgs/goods/de/18_4.jpg;imgs/goods/de/18_5.jpg;imgs/goods/de/18_6.jpg;imgs/goods/de/18_7.jpg;', '', '1', '天兴', 'http://www.ugoshop.com/brand_4293.html?tp=DetailPage.1', '2016-04-22 14:05:16', '134', '配置：天兴蜂巢250g/盒*3盒+天兴椴树蜜200g/瓶*3瓶 保质期：730天 产地：沈阳', '配置：天兴蜂巢250g/盒*3盒+天兴椴树蜜200g/瓶*3瓶', 'imgs/goods/intro/18_1.png', null, '', '订单金额满168元包邮');
INSERT INTO `gooddetails` VALUES ('26', 'imgs/goods/de/17_1.jpg;imgs/goods/de/17_2.jpg;imgs/goods/de/17_3.jpg;imgs/goods/de/17_4.jpg;imgs/goods/de/17_5.jpg;', null, '2', '瑞士小姐', 'http://www.ugoshop.com/brand_4150.html?tp=DetailPage.1', '2017-03-09 13:54:23', '30', '', '瑞士小姐牛奶巧克力冲饮粉280*2+瑞士小姐浓情巧克力冲饮粉283g*2', 'imgs/goods/intro/17_1.png', null, null, null);
INSERT INTO `gooddetails` VALUES ('27', 'imgs/goods/de/3_1.jpg;imgs/goods/de/3_2.jpg;imgs/goods/de/3_3.jpg;imgs/goods/de/3_4.jpg;imgs/goods/de/3_5.jpg;imgs/goods/de/3_6.jpg;imgs/goods/de/3_7.jpg;', null, '0', '一叶子', 'http://www.ugoshop.com/brand_794.html?tp=DetailPage.1', '2017-09-05 14:07:54', '1994', '材质/成份：乳液、塑料、纸@商品颜色：金色 @商品净重（Kg）：0.2 @商品尺寸 (长宽高  cm)：12.8*6.6*19.3 @品牌：一叶子@原产地：中国.苏州@制造商：苏州工业园区黎姿化妆品有限公司', '主品配置：一叶子蜂王浆紧致塑颜面膜40ml/片*10片*4*盒@赠品配置：一叶子蜂王浆紧致塑颜面膜40ml*2*片', 'imgs/goods/intro/3_1.png', null, 'TV商品下单立减10元', '订单金额满168元包邮');
INSERT INTO `gooddetails` VALUES ('28', 'imgs/goods/de/27_1.jpg;imgs/goods/de/27_2.jpg;imgs/goods/de/27_3.jpg;imgs/goods/de/27_4.jpg;imgs/goods/de/27_5.jpg;imgs/goods/de/27_6.jpg;', null, '1', '双立人', 'http://www.ugoshop.com/brand_1856.html?tp=DetailPage.1', '2015-09-07 14:13:04', '76', '品牌：双立人 构成：中片刀 刀身长度18cm ，多用刀 刀身长度18cm ，蔬菜刀 刀身长度8cm，剪刀 长度22cm；产地：中国 上海', 'Twin Point S 刀具5件套*1*套', 'imgs/goods/intro/27_1.png', null, null, '订单金额满168元包邮');
INSERT INTO `gooddetails` VALUES ('29', 'imgs/goods/de/5_1.jpg;imgs/goods/de/5_2.jpg;imgs/goods/de/5_3.jpg;imgs/goods/de/5_4.jpg;imgs/goods/de/5_5.jpg;imgs/goods/de/5_6.jpg;imgs/goods/de/5_7.jpg;', null, '0', '韩愢', 'http://www.ugoshop.com/brand_1557.html?tp=DetailPage.1', '2015-10-19 14:19:14', '2113', ' 材质/成份：烷基糖苷、人参、何首乌、羊毛脂等多种精华@商品颜色：自然黑、栗棕色 二色选一 @商品净重（Kg）：2.5 @品牌：韩愢生态原产地：广东@原产地：广东@制造商：中山市泛华精细化学品有限公司', '主品配置：韩愢生态3D鲜花泡泡染*4*盒@赠品配置：韩愢生态珍滋养洗发露*2*瓶 韩愢生态3D鲜花泡泡染（免费体验装） *2*包 韩愢生态3D鲜花泡泡染*2*盒', 'imgs/goods/intro/5_1.png', '韩愢生态珍滋养洗发露*2*瓶 韩愢生态3D鲜花泡泡染（免费体验装）*2*包 韩愢生态3D鲜花泡泡染*2*盒', 'TV商品下单立减10元', '订单金额满168元包邮');
INSERT INTO `gooddetails` VALUES ('30', 'imgs/goods/de/26_1.jpg;imgs/goods/de/26_2.jpg;imgs/goods/de/26_3.jpg;imgs/goods/de/26_4.jpg;imgs/goods/de/26_5.jpg;imgs/goods/de/26_6.jpg;imgs/goods/de/26_7.jpg;', null, '1', 'SIMELO施美乐', 'http://www.ugoshop.com/brand_4767.html?tp=DetailPage.1', '2017-06-27 14:25:52', '33', '智能电水壶：容量1.8L，壶身材质：高硼硅玻璃，发热盘：食品接触用不锈钢，功率：1850W。 芬兰保温壶：容量1.5L，内胆材质：双层抽真空镀铜玻璃红胆，外壳pp材质，保温效果：12小时。 小鸟保温杯：容量300ml，材质：内胆304不锈钢，食品接触用pp，硅胶，保温效果：24小时大于等于40度。 拇指杯：容量600ml，材质：杯体玻璃，杯盖：食品级pp。', '电热水壶*1*个 保温壶*1*个 保温杯*1*个 玻璃饮水杯*1*个', 'imgs/goods/intro/26_1.png', null, null, '订单金额满168元包邮');
INSERT INTO `gooddetails` VALUES ('31', 'imgs/goods/de/7_1.jpg;imgs/goods/de/7_2.jpg;imgs/goods/de/7_3.jpg;imgs/goods/de/7_4.jpg;imgs/goods/de/7_5.jpg;imgs/goods/de/7_6.jpg;imgs/goods/de/7_7.jpg;', null, '0', '韩后', 'http://www.ugoshop.com/brand_664.html?tp=DetailPage.1', '2017-03-07 14:34:48', '739', '\r\n商品品牌：韩后@商品配置：主品：乳清蛋白蓓润美容液120ml*2个@乳清蛋白蓓润精华液30ml*2个@ 乳清蛋白蓓润霜40g*2个@ 试用装：乳清蛋白倍润美容液1ml*1个@乳清蛋白倍润精华液1ml*1个@ 乳清蛋白倍润霜1g*1个', '乳清蛋白蓓润美容液120ml*2*个 乳清蛋白蓓润精华液30ml*2*个 乳清蛋白蓓润霜40g*2*个 试用装：乳清蛋白倍润美容液1ml*1*个 试用装：乳清蛋白倍润精华液1ml*1*个 试用装：乳清蛋白倍润霜1g*1*个', 'imgs/goods/intro/7_1.png', null, 'TV商品下单立减10元', '订单金额满168元包邮');
INSERT INTO `gooddetails` VALUES ('32', 'imgs/goods/de/8_1.jpg;imgs/goods/de/8_2.jpg;imgs/goods/de/8_3.jpg;imgs/goods/de/8_4.jpg;imgs/goods/de/8_5.jpg;imgs/goods/de/8_6.jpg;imgs/goods/de/8_7.jpg;', null, '1', '吕', 'http://www.ugoshop.com/brand_2087.html?tp=DetailPage.1', '2016-12-06 14:41:26', '34', '商品名称：吕臻萃恒护多效洗护六件套 品牌：吕 分类：美妆洗护护理 功效：滋养秀发 退货政策：不影响二次销售 颜色：黑色 规格：吕臻萃恒护多效洗发水400g*3*瓶 吕臻萃恒护多效发膜300ml*3*瓶 吕臻参葆凝时焕活洗发乳100g*1*瓶 吕臻参葆凝时焕活护发乳100ml*1*瓶 原产国家：韩国 适用人群：不限 产品包装：有盒塑封 限期使用日期：见包装', '吕臻萃恒护多效洗发水400g*3*瓶 吕臻萃恒护多效发膜300ml*3*瓶 臻参葆凝时焕活洗发水 100g*1*瓶 吕 臻参葆凝时焕活护发乳 100ml*1*瓶', 'imgs/goods/intro/8_1.png', null, null, '订单金额满168元包邮');
INSERT INTO `gooddetails` VALUES ('33', 'imgs/goods/de/9_1.jpg;imgs/goods/de/9_2.jpg;imgs/goods/de/9_3.jpg;imgs/goods/de/9_4.jpg;imgs/goods/de/9_5.jpg;imgs/goods/de/9_6.jpg;imgs/goods/de/9_7.jpg;', null, '0', '阿尔帝', 'http://www.ugoshop.com/brand_4395.html?tp=DetailPage.1', '2017-05-15 14:45:45', '210', '材质：牛肉\r\n材质：牛肉@产地：国内', '蒸食代牛大块罐头（香辣）150g*13*盒 蒸食代牛大块罐头（红烧）150g*13*盒 香菇牛肉酱罐头100g*6*盒', 'imgs/goods/intro/9_1.png', null, 'TV商品下单立减10元', '订单金额满168元包邮');
INSERT INTO `gooddetails` VALUES ('34', 'imgs/goods/de/10_1.jpg;imgs/goods/de/10_2.jpg;imgs/goods/de/10_3.jpg;imgs/goods/de/10_4.jpg;imgs/goods/de/10_5.jpg;imgs/goods/de/10_6.jpg;imgs/goods/de/10_7.jpg;', null, '0', '七彩枫叶', null, '2016-06-09 14:49:39', '1000', '产地：中国型号：M/L/XL 材质:90%聚酯纤维10%氨纶颜色：紫色、玫粉色', '高贵紫金丝绒休闲套装（上衣+裤子）*1*套 玫红金丝绒休闲套装（上衣+裤子）*1*套', 'imgs/goods/intro/10_1.png', null, null, '订单金额满168元包邮');
INSERT INTO `gooddetails` VALUES ('35', 'imgs/goods/de/11_1.jpg;imgs/goods/de/11_2.jpg;imgs/goods/de/11_3.jpg;imgs/goods/de/11_4.jpg;imgs/goods/de/11_5.jpg;imgs/goods/de/11_6.jpg;imgs/goods/de/11_7.jpg;', null, '0', 'SWISSWIN（瑞士军刀）', 'http://www.ugoshop.com/brand_1818.html?tp=DetailPage.1', '2016-08-04 14:53:08', '289', '商品型号/规格/款式：45*28*66cm   @材质/成份：PC+涤纶  @轮子：尼龙+TPU@商品颜色：灰色、酒红色@商品净重（Kg）：2.72@商品尺寸 (长宽高  cm)：24英寸拉杆箱：45*28*66cm@双肩包：46*31*18cm   @品牌：swisswin @原产地：福建福清    @制造商：骏洋（福建）旅游用品有限公司 @适用季节：春夏秋冬@适用人群年龄段：18-65 @适用人群性别：老中青', '商品配置：24英寸拉杆箱*1*个 双肩包*1*个', 'imgs/goods/intro/11_1.png', null, 'TV商品下单立减10元', '订单金额满168元包邮');
INSERT INTO `gooddetails` VALUES ('36', 'imgs/goods/de/12_1.jpg;imgs/goods/de/12_2.jpg;imgs/goods/de/12_3.jpg;imgs/goods/de/12_4.jpg;imgs/goods/de/12_5.jpg;imgs/goods/de/12_6.jpg;', null, '0', '华翠缘', 'http://www.ugoshop.com/brand_5136.html?tp=DetailPage.1', '2017-02-28 14:57:54', '14', '材质：蜜蜡@吊坠尺寸约：35*25*15，重10g以上（含链）', '水滴形蜜蜡吊坠*1*件 鉴定证书*1*张', 'imgs/goods/intro/12_1.png', null, null, '订单金额满168元包邮');

-- ----------------------------
-- Table structure for userbase
-- ----------------------------
DROP TABLE IF EXISTS `userbase`;
CREATE TABLE `userbase` (
  `id` bigint(20) NOT NULL COMMENT '用户账号',
  `name` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '用户名',
  `psd` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '用户密码',
  `vip` int(1) NOT NULL DEFAULT '0' COMMENT '用户是否vip',
  `tv` int(1) DEFAULT '0' COMMENT '用户是否tv用户',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of userbase
-- ----------------------------
INSERT INTO `userbase` VALUES ('13612341235', null, 'eed8cdc400dfd4ec85dff70a170066b7', '0', '0');
INSERT INTO `userbase` VALUES ('13412341234', null, 'eed8cdc400dfd4ec85dff70a170066b7', '0', '0');
INSERT INTO `userbase` VALUES ('13512341234', null, 'af15d5fdacd5fdfea300e88a8e253e82', '0', '0');
INSERT INTO `userbase` VALUES ('13612341234', null, '0b4e7a0e5fe84ad35fb5f95b9ceeac79', '0', '0');
INSERT INTO `userbase` VALUES ('13412341235', null, 'eed8cdc400dfd4ec85dff70a170066b7', '0', '0');

-- ----------------------------
-- Table structure for userinfo
-- ----------------------------
DROP TABLE IF EXISTS `userinfo`;
CREATE TABLE `userinfo` (
  `id` bigint(20) NOT NULL COMMENT '用户账号',
  `time` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '用户注册时间',
  `care` longtext CHARACTER SET utf8 COMMENT '用户关注',
  `car` longtext CHARACTER SET utf8 COMMENT '用户购物车',
  `carnum` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of userinfo
-- ----------------------------
INSERT INTO `userinfo` VALUES ('13412341234', '2017-09-11 12:15:24', null, '[{\"idx\":\"18\",\"num\":\"1\",\"sale\":\"259\"}]', '1');
INSERT INTO `userinfo` VALUES ('13612341235', '2017-09-06 14:54:04', null, '[{\"idx\":\"5\",\"num\":7}]', '7');
SET FOREIGN_KEY_CHECKS=1;
