USE [master]
GO
/****** Object:  Database [SongChooser]    Script Date: 11/11/2017 1:20:54 PM ******/
CREATE DATABASE [SongChooser]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'songChooser', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.SQLEXPRESS\MSSQL\DATA\songChooser.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'songChooser_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.SQLEXPRESS\MSSQL\DATA\songChooser_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [SongChooser] SET COMPATIBILITY_LEVEL = 130
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [SongChooser].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [SongChooser] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [SongChooser] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [SongChooser] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [SongChooser] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [SongChooser] SET ARITHABORT OFF 
GO
ALTER DATABASE [SongChooser] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [SongChooser] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [SongChooser] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [SongChooser] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [SongChooser] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [SongChooser] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [SongChooser] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [SongChooser] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [SongChooser] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [SongChooser] SET  DISABLE_BROKER 
GO
ALTER DATABASE [SongChooser] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [SongChooser] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [SongChooser] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [SongChooser] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [SongChooser] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [SongChooser] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [SongChooser] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [SongChooser] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [SongChooser] SET  MULTI_USER 
GO
ALTER DATABASE [SongChooser] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [SongChooser] SET DB_CHAINING OFF 
GO
ALTER DATABASE [SongChooser] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [SongChooser] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [SongChooser] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [SongChooser] SET QUERY_STORE = OFF
GO
USE [SongChooser]
GO
ALTER DATABASE SCOPED CONFIGURATION SET MAXDOP = 0;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET MAXDOP = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET LEGACY_CARDINALITY_ESTIMATION = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET LEGACY_CARDINALITY_ESTIMATION = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET PARAMETER_SNIFFING = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET PARAMETER_SNIFFING = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET QUERY_OPTIMIZER_HOTFIXES = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET QUERY_OPTIMIZER_HOTFIXES = PRIMARY;
GO
USE [SongChooser]
GO
/****** Object:  Table [dbo].[Song]    Script Date: 11/11/2017 1:20:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Song](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[song_name] [varchar](256) NULL,
	[path] [varchar](512) NULL,
	[tags] [varchar](512) NULL,
 CONSTRAINT [PK_songs] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Template]    Script Date: 11/11/2017 1:20:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Template](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[name] [varchar](50) NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[TemplateDetail]    Script Date: 11/11/2017 1:20:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TemplateDetail](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[template_id] [bigint] NOT NULL,
	[song_id] [bigint] NULL,
	[order_index] [bigint] NULL,
	[template_song_name] [varchar](256) NULL
) ON [PRIMARY]

GO
SET IDENTITY_INSERT [dbo].[Song] ON 

INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (1, N'All that is hidden.htm', N'./HTML_Files/All that is hidden.htm', N'')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (2, N'ALL THE EARTH.htm', N'./HTML_Files/ALL THE EARTH.htm', N'')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (3, N'Alleluia Sing to Jesus.htm', N'./HTML_Files/Alleluia Sing to Jesus.htm', N'')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (4, N'Alleluia! Raise the Gospel.htm', N'./HTML_Files/Alleluia! Raise the Gospel.htm', N'')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (5, N'BlankScreen.htm', N'./HTML_Files/Start and other pages/BlankScreen.htm', N'Start and other pages')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (6, N'Christ Be Our Light', N'./HTML_Files/ChristBeOurLight.htm', N'')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (7, N'City of God', N'./HTML_Files/CityofGod.htm', N'')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (8, N'Creator spirit.htm', N'./HTML_Files/Creator spirit.htm', N'')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (9, N'Crown Him With Many Crowns.htm', N'./HTML_Files/Crown Him With Many Crowns.htm', N'')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (10, N'DismissalTaketheword.htm', N'./HTML_Files/DismissalTaketheword.htm', N'')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (11, N'Emmaus_Road.htm', N'./HTML_Files/Emmaus_Road.htm', N'')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (12, N'Gather Us In', N'./HTML_Files/Gather Us In.htm', N'')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (13, N'Gather your people O Lord.htm', N'./HTML_Files/Gather your people O Lord.htm', N'')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (14, N'Gift Of Finest Wheat.htm', N'./HTML_Files/Gift Of Finest Wheat.htm', N'')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (15, N'Glory and Praise to Our God.htm', N'./HTML_Files/Glory and Praise to Our God.htm', N'')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (16, N'Glory in the Cross -Easter Verses.htm', N'./HTML_Files/Glory in the Cross -Easter Verses.htm', N'')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (17, N'God''s Holy Gifts.htm', N'./HTML_Files/God''s Holy Gifts.htm', N'')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (18, N'Hail Holy Queen Enthroned Above.htm', N'./HTML_Files/Hail Holy Queen Enthroned Above.htm', N'')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (19, N'Hail Redeemer King Divine.htm', N'./HTML_Files/Hail Redeemer King Divine.htm', N'')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (20, N'Help of Christians.htm', N'./HTML_Files/Help of Christians.htm', N'')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (21, N'Jesus Christ You My Life', N'./HTML_Files/Jesus Christ You My Life.htm', N'')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (22, N'Jesus Lives.htm', N'./HTML_Files/Jesus Lives.htm', N'')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (23, N'Living Spirit Holy Fire.htm', N'./HTML_Files/Living Spirit Holy Fire.htm', N'')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (24, N'LordtoWhomShallWeGo.htm', N'./HTML_Files/LordtoWhomShallWeGo.htm', N'')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (25, N'Main Easter Season Year A 2017.htm', N'./HTML_Files/Main Pages/Main Easter Season Year A 2017.htm', N'Main Pages')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (26, N'Main Ordinary Season Year A 2017.htm', N'./HTML_Files/Main Pages/Main Ordinary Season Year A 2017.htm', N'Main Pages')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (27, N'ApostlesCreed.htm', N'./HTML_Files/Mass Prayers/ApostlesCreed.htm', N'Mass Prayers')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (28, N'TheConfiteor.htm', N'./HTML_Files/Mass Prayers/TheConfiteor.htm', N'Mass Prayers')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (29, N'Amen Sacred Heart.htm', N'./HTML_Files/Mass Settings/Amen Sacred Heart.htm', N'Mass Settings')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (30, N'Glory To God - Sacred Heart.htm', N'./HTML_Files/Mass Settings/Glory To God - Sacred Heart.htm', N'Mass Settings')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (31, N'Glory To God -Christ the Saviour.htm', N'./HTML_Files/Mass Settings/Glory To God -Christ the Saviour.htm', N'Mass Settings')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (32, N'Gospel Acclamation - Easter.htm', N'./HTML_Files/Mass Settings/Gospel Acclamation - Easter.htm', N'Mass Settings')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (33, N'HolyHolyHoly Sacred Heart.htm', N'./HTML_Files/Mass Settings/HolyHolyHoly Sacred Heart.htm', N'Mass Settings')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (34, N'HolyHolyHoly.htm', N'./HTML_Files/Mass Settings/HolyHolyHoly.htm', N'Mass Settings')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (35, N'LambofGod.htm', N'./HTML_Files/Mass Settings/LambofGod.htm', N'Mass Settings')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (36, N'Memorial Acclamation Sacred Heart.htm', N'./HTML_Files/Mass Settings/Memorial Acclamation Sacred Heart.htm', N'Mass Settings')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (37, N'MemorialAcclamationSave us.htm', N'./HTML_Files/Mass Settings/MemorialAcclamationSave us.htm', N'Mass Settings')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (38, N'O come to the throne of grace.htm', N'./HTML_Files/O come to the throne of grace.htm', N'')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (39, N'One Bread, One Cup.htm', N'./HTML_Files/One Bread, One Cup.htm', N'')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (40, N'One_bread_One_Body.htm', N'./HTML_Files/One_bread_One_Body.htm', N'')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (41, N'Open My Eyes Lord.htm', N'./HTML_Files/Open My Eyes Lord.htm', N'')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (42, N'header.htm', N'./HTML_Files/Open My Eyes_files/header.htm', N'Open My Eyes_files')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (43, N'Open My Eyes.htm', N'./HTML_Files/Open My Eyes.htm', N'')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (44, N'Pentecost Sequence - Veni Sancte Spiritus.htm', N'./HTML_Files/Pentecost Sequence - Veni Sancte Spiritus.htm', N'')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (45, N'2nd Reading A reading from the Letter of St Paul to the Corinthians.htm', N'./HTML_Files/Readings/2nd Reading A reading from the Letter of St Paul to the Corinthians.htm', N'Readings')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (46, N'Response Palm Sunday Year A 2017.htm', N'./HTML_Files/Response Palm Sunday Year A 2017.htm', N'')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (47, N'Shepherd_me_O_God.htm', N'./HTML_Files/Shepherd_me_O_God.htm', N'')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (48, N'Shine Jesus Shne.htm', N'./HTML_Files/Shine Jesus Shne.htm', N'')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (49, N'Sing A New Song.htm', N'./HTML_Files/Sing A New Song.htm', N'')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (50, N'Sing to the Mountains', N'./HTML_Files/Sing_to_the_Mountains.htm', N'')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (51, N'SongofthebodyofChrist.htm', N'./HTML_Files/SongofthebodyofChrist.htm', N'')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (52, N'Springs of Water.htm', N'./HTML_Files/Springs of Water.htm', N'')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (53, N'100th Year Fatima.htm', N'./HTML_Files/Start and other pages/100th Year Fatima.htm', N'Start and other pages')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (54, N'Start Page 23 April 2017.htm', N'./HTML_Files/Start and other pages/Start Page 23 April 2017.htm', N'Start and other pages')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (55, N'Start Page 30th April 2017.htm', N'./HTML_Files/Start and other pages/Start Page 30th April 2017.htm', N'Start and other pages')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (56, N'Start Page Ascension April 2017.htm', N'./HTML_Files/Start and other pages/Start Page Ascension April 2017.htm', N'Start and other pages')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (57, N'Taize laudate Domimun.htm', N'./HTML_Files/Taize laudate Domimun.htm', N'')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (58, N'Take and Eat', N'./HTML_Files/Take and Eat.htm', N'')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (59, N'Take the word of God with you', N'./HTML_Files/Take the word of God with you.htm', N'')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (60, N'Ubi caritas est vera', N'./HTML_Files/Ubi caritas est vera.htm', N'')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (61, N'Unless a Grain of Wheat.htm', N'./HTML_Files/Unless a Grain of Wheat.htm', N'')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (62, N'We Praise you O God 2013.htm', N'./HTML_Files/We Praise you O God 2013.htm', N'')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (63, N'We Praise You O God.htm', N'./HTML_Files/We Praise You O God.htm', N'')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (64, N'We remember', N'./HTML_Files/We remember.htm', N'')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (65, N'We Walk by Faith.htm', N'./HTML_Files/We Walk by Faith.htm', N'')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (66, N'Where Two Three are Gathered.htm', N'./HTML_Files/Where Two Three are Gathered.htm', N'')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (67, N'Without  Seeing  You Easter Version.htm', N'./HTML_Files/Without  Seeing  You Easter Version.htm', N'')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (68, N'Announcements', N'./HTML_Files/Start and other pages/Announcements.htm', N'Start and other pages')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (69, N'All the Ends of the Earth', N'./HTML_Files/All the ends of the earth.htm', NULL)
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (70, N'Eye has not Seen', N'./HTML_FIles/Eye has not Seen.htm', NULL)
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (71, N'Eat this bread', N'./HTML_Files/Eat this bread.htm', NULL)
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (72, N'Seek ye First', N'./HTML_Files/Seek ye First.htm', NULL)
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (73, N'Sing unto the Lord a new song', N'./HTML_Files/Sing unto the Lord a new song.htm', NULL)
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (74, N'God is Good', N'./HTML_FIles/God is Good.htm', NULL)
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (75, N'Praise the Father, Praise the Son', N'./HTML_FIles/Praise the Father, Praise the Son.htm', NULL)
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (76, N'I will celebrate', N'./HTML_FIles/I will celebrate.htm', NULL)
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (77, N'You are my all in all', N'./HTML_FIles/You are my all in all.htm', NULL)
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (78, N'Breathe on Us', N'./HTML_FIles/Breathe on US.htm', NULL)
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (79, N'Set my Spirit Free', N'./HTML_FIles/Set my spirit free.htm', NULL)
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (80, N'How great is our god', N'./HTML_FIles/How great is our god.htm', NULL)
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (81, N'O SACRAMENT MOST HOLY 2', N'./HTML_Files/O SACRAMENT MOST HOLY 2.htm', NULL)
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (82, N'Come to Water', N'./HTML_Files/Come to entrance.htm', NULL)
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (83, N'Majesty', N'./HTML_Files/Majesty.htm', NULL)
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (84, N'i will enter his gates with thanksgiving in my heart', N'./HTML_Files/i will enter his gates with thanksgiving in my heart.htm', NULL)
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (85, N'O SACRAMENT MOST HOLY', N'./HTML_Files/O SACRAMENT MOST HOLY.htm', NULL)
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (86, N'River of God', N'./HTML_Files/River of God.htm', NULL)
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (87, N'Heart of Jesus, Heart of Mercy', N'./HTML_Files/heart of Jesus.htm', NULL)
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (88, N'I Heard the Voice of Jesus', N'./HTML_Files/I Heard the Voice of Jesus.htm', NULL)
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (89, N'LAMB OF GOD', N'./HTML_Files/LAMB OF GOD.htm', NULL)
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (90, N'All over the world', N'./HTML_Files/All over the world.htm', NULL)
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (91, N'BROKEN VESSELS (AMAZING GRACE)', N'./HTML_Files/BROKEN VESSELS ( AMAZING GRACE).htm', NULL)
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (92, N'Come Now is the Time to Worship', N'./HTML_Files/COME NOW IS THE TIME.htm', NULL)
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (93, N'Here I am to worship', N'./HTML_Files/Here I am to worship.htm', NULL)
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (94, N'Holy Lord God Almighty', N'./HTML_Files/HOLY LORD GOD ALMIGHTY.htm', NULL)
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (95, N'Holy Spirit Rain Down', N'./HTML_Files/holy spirit rain down.htm', NULL)
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (96, N'Let the Fire fall', N'./HTML_Files/let the fire fall.htm', NULL)
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (97, N'oh Lord we love you forever', N'./HTML_Files/oh Lord we love you forever .htm', NULL)
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (98, N'shine jesus shine', N'./HTML_Files/shine jesus shine.htm', NULL)
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (99, N'Spirit Of The Living God', N'./HTML_Files/spirit of the living god.htm', NULL)
GO
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (100, N'Spirit Song', N'./HTML_Files/SPIRIT SONG.htm', NULL)
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (101, N'spirit touch your church', N'./HTML_Files/spirit touch your church .htm', NULL)
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (102, N'You are Mine', N'./HTML_Files/You are Mine.htm', NULL)
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (103, N'Come Holy Spirit Fall on Me', N'./HTML_Files/Come Holy Spirit Fall on Me.htm', NULL)
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (104, N'All Creatures of our God and King', N'./HTML_Files/All Creatures of our God and King.htm', NULL)
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (105, N'Prayer For St Francis', N'./HTML_Files/Prayer for St Francis.htm', NULL)
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (106, N'Now thank we all our God', N'./HTML_Files/Now thank we all our God.htm', NULL)
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (107, N'Glory To God - Joy And Peace.htm', N'./HTML_Files/Mass Settings/Glory To God - Joy And Peace.htm', N'Mass Settings')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (108, N'HolyHolyHoly Joy and Peace', N'./HTML_Files/Mass Settings/HolyHolyHoly Joy and Peace.htm', N'Mass Settings')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (109, N'Gospel Acclamation - Joy and Peace', N'./HTML_Files/Mass Settings/Gospel Acclamation - Joy and Peace.htm', N'Mass Settings')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (110, N'Blest are They', N'./HTML_Files/Blest are They.htm', NULL)
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (111, N'Memorial Acclamation Joy and Peace', N'./HTML_Files/Mass Settings/Memorial Acclamation Joy and Peace.htm', N'Mass Settings')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (112, N'Amen Joy and Peace.htm', N'./HTML_Files/Mass Settings/Amen Joy and Peace.htm', N'Mass Settings')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (113, N'Make of Our Hands a Throne', N'./HTML_Files/Make of Our Hands a Throne.htm', NULL)
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (114, N'Alleluia! Sing now with gladness', N'./HTML_Files/Alleluia! Sing now with gladness.htm', NULL)
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (116, N'A New Commandment', N'./HTML_Files/A New Commandment.htm', NULL)
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (117, N'Ubi caritas -Taize-', N'./HTML_Files/Ubi caritas -Taize-.htm', NULL)
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (118, N'Now We Remain', N'./HTML_Files/Now We Remain.html', NULL)
SET IDENTITY_INSERT [dbo].[Song] OFF
SET IDENTITY_INSERT [dbo].[Template] ON 

INSERT [dbo].[Template] ([id], [name]) VALUES (1, N'Aug 20')
INSERT [dbo].[Template] ([id], [name]) VALUES (2, N'Aug 27')
INSERT [dbo].[Template] ([id], [name]) VALUES (5, N'LSS - 29th')
INSERT [dbo].[Template] ([id], [name]) VALUES (6, N'LSS - 1st')
INSERT [dbo].[Template] ([id], [name]) VALUES (7, N'LSS - Adoration')
INSERT [dbo].[Template] ([id], [name]) VALUES (8, N'8 Oct')
INSERT [dbo].[Template] ([id], [name]) VALUES (9, N'15 Oct')
INSERT [dbo].[Template] ([id], [name]) VALUES (11, N'Oct 22')
INSERT [dbo].[Template] ([id], [name]) VALUES (12, N'Oct 29')
INSERT [dbo].[Template] ([id], [name]) VALUES (13, N'11-Nov')
SET IDENTITY_INSERT [dbo].[Template] OFF
SET IDENTITY_INSERT [dbo].[TemplateDetail] ON 

INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (1, 1, 68, 0, N'Announcements')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (2, 1, 12, 1, N'Gather Us In')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (3, 1, 30, 2, N'Gloria')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (4, 1, 46, 3, N'Response Palm')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (5, 1, 32, 4, N'Gospel Acclamation')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (6, 1, 27, 5, N'Apostle Creed')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (7, 1, 62, 6, N'Preparation of Gifts - Hymn')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (8, 1, 33, 7, N'Holy Holy Holy')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (9, 1, 36, 8, N'Memorial Acclamation')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (10, 1, 29, 9, N'Amen')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (11, 1, 35, 10, N'Lamb of God')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (12, 1, 64, 11, N'Communion 1 – Hymn')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (13, 1, 24, 12, N'Communion 2 – Hymn ')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (14, 1, 2, 13, N'Sending Forth – Hymn ')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (15, 1, 5, 14, N'Blank Screen')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (45, 2, 69, 0, N'Entrance Hymn - All the Ends of the Earth')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (46, 2, 30, 1, N'Gloria')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (47, 2, 46, 2, N'Response Palm')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (48, 2, 32, 3, N'Gospel Acclamation')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (49, 2, 27, 4, N'Apostle Creed')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (50, 2, 70, 5, N'Preparation of Gifts - Eye has not Seen')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (51, 2, 33, 6, N'Holy Holy Holy')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (52, 2, 36, 7, N'Memorial Acclamation')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (53, 2, 29, 8, N'Amen')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (54, 2, 35, 9, N'Lamb of God')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (55, 2, 71, 10, N'Communion 1 – Eat this Bread')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (56, 2, 13, 11, N'Communion 2 – Gather your People')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (57, 2, 7, 12, N'Sending Forth – City of God')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (58, 2, 5, 13, N'Blank Screen')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (111, 5, 6, 0, N'Entrance Hymn - Christ Be Our Light')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (112, 5, 30, 1, N'Gloria')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (113, 5, 32, 2, N'Gospel Acclamation')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (114, 5, 27, 3, N'Apostle Creed')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (115, 5, 33, 4, N'Holy Holy Holy')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (116, 5, 35, 5, N'Lamb of God')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (117, 5, 75, 6, N'Communion 1 – Praise the Father')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (118, 5, 77, 7, N'Sending Forth - You are my all in all')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (119, 5, 5, 8, N'Blank Screen')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (134, 6, 86, 0, N'Entrance Hymn - River of God')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (135, 6, 31, 1, N'Glory To God - Christ the Saviour')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (136, 6, 46, 2, N'Response Palm')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (137, 6, 32, 3, N'Gospel Acclamation')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (138, 6, 27, 4, N'Apostle Creed')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (139, 6, 88, 5, N'Preparation of Gifts - I Heard the Voice of Jesus')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (140, 6, 33, 6, N'Holy Holy Holy')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (141, 6, 36, 7, N'Memorial Acclamation')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (142, 6, 29, 8, N'Amen')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (143, 6, 35, 9, N'Lamb of God')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (144, 6, 87, 10, N'Communion 1 – Heart of Jesus')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (145, 6, 7, 11, N'Sending Forth – City of God')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (146, 6, 5, 12, N'Blank Screen')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (177, 7, 85, 0, NULL)
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (178, 7, 81, 1, NULL)
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (179, 7, 78, 2, N'Breathe on Us - 1')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (180, 7, 92, 3, NULL)
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (181, 7, 94, 4, NULL)
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (182, 7, 102, 5, NULL)
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (183, 7, 100, 6, NULL)
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (184, 7, 99, 7, NULL)
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (185, 7, 96, 8, NULL)
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (186, 7, 95, 9, NULL)
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (187, 7, 103, 10, NULL)
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (188, 7, 78, 11, N'Breathe on Us - 2')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (189, 7, 5, 12, N'Blank Screen')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (261, 9, 12, 0, N'Entrance Hymn - Gather us in')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (262, 9, 107, 1, N'Gloria')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (263, 9, 46, 2, N'Response Palm')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (264, 9, 109, 3, NULL)
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (265, 9, 27, 4, N'Apostle Creed')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (266, 9, 105, 5, N'Preparation of Gifts - Prayer For St Francis')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (267, 9, 108, 6, N'Holy Holy Holy - Joy and Peace')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (268, 9, 111, 7, NULL)
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (269, 9, 29, 8, N'Amen')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (270, 9, 35, 9, N'Lamb of God')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (271, 9, 110, 10, N'Communion 1 - Blest are They')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (272, 9, 58, 11, N'Communion 2 - Take and Eat')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (273, 9, 50, 12, N'Sending Forth - Sing to the Mountains')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (274, 9, 5, 13, N'Blank Screen')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (404, 12, 117, 0, N'Taize - Ubi caritas est vera')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (405, 12, 114, 1, N'Entrance Hymn - Alleluia! Sing now with gladness')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (406, 12, 107, 2, N'Gloria')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (407, 12, 46, 3, N'Response Palm')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (408, 12, 109, 4, NULL)
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (409, 12, 27, 5, N'Apostle Creed')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (410, 12, 116, 6, N'Preparation of Gifts - A New Commandment')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (411, 12, 108, 7, N'Holy Holy Holy - Joy and Peace')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (412, 12, 111, 8, NULL)
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (413, 12, 112, 9, NULL)
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (414, 12, 35, 10, N'Lamb of God')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (415, 12, 110, 11, N'Communion 1 - Blest are They')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (416, 12, 64, 12, N'Communion 2 - We remember')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (417, 12, 50, 13, N'Sending Forth - Sing to the Mountains')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (418, 12, 5, 14, N'Blank Screen')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (331, 11, 87, 0, N'Entrance Hymn - Heart of Jesus, Heart of Mercy')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (332, 11, 107, 1, N'Gloria')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (333, 11, 46, 2, N'Response Palm')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (334, 11, 109, 3, N'Gospel Acclamation - Joy and Peace NOT USED')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (335, 11, 27, 4, N'Apostle Creed')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (336, 11, 114, 5, N'Preparation of Gifts - Alleluia! Sing now with gladness')
GO
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (337, 11, 108, 6, N'Holy Holy Holy - Joy and Peace')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (338, 11, 111, 7, NULL)
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (339, 11, 112, 8, NULL)
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (340, 11, 35, 9, N'Lamb of God')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (341, 11, 60, 10, N'Communion 1 - Ubi caritas')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (342, 11, 113, 11, N'Communion 2 - Make of Our Hands a Throne')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (343, 11, 21, 12, N'Sending Forth - Jesus Christ You My Life')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (344, 11, 5, 13, N'Blank Screen')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (495, 13, 117, 0, N'Taize - Ubi caritas est vera')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (496, 13, 7, 1, N'Entrance Hymn - City of God')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (497, 13, 107, 2, N'Gloria')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (498, 13, 46, 3, N'Response Palm')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (499, 13, 109, 4, NULL)
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (500, 13, 27, 5, N'Apostle Creed')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (501, 13, 118, 6, N'Preparation of Gifts - Now We Remain')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (502, 13, 108, 7, N'Holy Holy Holy - Joy and Peace')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (503, 13, 111, 8, NULL)
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (504, 13, 112, 9, NULL)
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (505, 13, 35, 10, N'Lamb of God')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (506, 13, 17, 11, N'Communion 1 - God''s Holy Gifts')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (507, 13, 82, 12, N'Communion 2 - Come to Water')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (508, 13, 6, 13, N'Sending Forth - Christ Be Our Light')
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index], [template_song_name]) VALUES (509, 13, 5, 14, N'Blank Screen')
SET IDENTITY_INSERT [dbo].[TemplateDetail] OFF
USE [master]
GO
ALTER DATABASE [SongChooser] SET  READ_WRITE 
GO
