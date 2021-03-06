USE [master]
GO
/****** Object:  Database [SongChooser]    Script Date: 24/08/2017 11:11:07 PM ******/
CREATE DATABASE [SongChooser]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'songChooser', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL13.SQLEXPRESS\MSSQL\DATA\songChooser.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'songChooser_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL13.SQLEXPRESS\MSSQL\DATA\songChooser_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
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
/****** Object:  Table [dbo].[Song]    Script Date: 24/08/2017 11:11:07 PM ******/
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
/****** Object:  Table [dbo].[Template]    Script Date: 24/08/2017 11:11:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Template](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[name] [varchar](50) NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[TemplateDetail]    Script Date: 24/08/2017 11:11:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TemplateDetail](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[template_id] [bigint] NULL,
	[song_id] [bigint] NULL,
	[order_index] [bigint] NULL
) ON [PRIMARY]

GO
SET IDENTITY_INSERT [dbo].[Song] ON 

INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (1, N'All that is hidden.htm', N'./HTML_Files/All that is hidden.htm', N'')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (2, N'ALL THE EARTH.htm', N'./HTML_Files/ALL THE EARTH.htm', N'')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (3, N'Alleluia Sing to Jesus.htm', N'./HTML_Files/Alleluia Sing to Jesus.htm', N'')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (4, N'Alleluia! Raise the Gospel.htm', N'./HTML_Files/Alleluia! Raise the Gospel.htm', N'')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (5, N'BlankScreen.htm', N'./HTML_Files/Start and other pages/BlankScreen.htm', N'Start and other pages')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (6, N'ChristBeOurLight.htm', N'./HTML_Files/ChristBeOurLight.htm', N'')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (7, N'CityofGod.htm', N'./HTML_Files/CityofGod.htm', N'')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (8, N'Creator spirit.htm', N'./HTML_Files/Creator spirit.htm', N'')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (9, N'Crown Him With Many Crowns.htm', N'./HTML_Files/Crown Him With Many Crowns.htm', N'')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (10, N'DismissalTaketheword.htm', N'./HTML_Files/DismissalTaketheword.htm', N'')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (11, N'Emmaus_Road.htm', N'./HTML_Files/Emmaus_Road.htm', N'')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (12, N'Gather Us In.htm', N'./HTML_Files/Gather Us In.htm', N'')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (13, N'Gather your people O Lord.htm', N'./HTML_Files/Gather your people O Lord.htm', N'')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (14, N'Gift Of Finest Wheat.htm', N'./HTML_Files/Gift Of Finest Wheat.htm', N'')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (15, N'Glory and Praise to Our God.htm', N'./HTML_Files/Glory and Praise to Our God.htm', N'')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (16, N'Glory in the Cross -Easter Verses.htm', N'./HTML_Files/Glory in the Cross -Easter Verses.htm', N'')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (17, N'God''s Holy Gifts.htm', N'./HTML_Files/God''s Holy Gifts.htm', N'')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (18, N'Hail Holy Queen Enthroned Above.htm', N'./HTML_Files/Hail Holy Queen Enthroned Above.htm', N'')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (19, N'Hail Redeemer King Divine.htm', N'./HTML_Files/Hail Redeemer King Divine.htm', N'')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (20, N'Help of Christians.htm', N'./HTML_Files/Help of Christians.htm', N'')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (21, N'Jesus Christ You My Life.htm', N'./HTML_Files/Jesus Christ You My Life.htm', N'')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (22, N'Jesus Lives.htm', N'./HTML_Files/Jesus Lives.htm', N'')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (23, N'Living Spirit Holy Fire.htm', N'./HTML_Files/Living Spirit Holy Fire.htm', N'')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (24, N'LordtoWhomShallWeGo.htm', N'./HTML_Files/LordtoWhomShallWeGo.htm', N'')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (25, N'Main Easter Season Year A 2017.htm', N'./HTML_Files/Main Pages/Main Easter Season Year A 2017.htm', N'Main Pages')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (26, N'Main Ordinary Season Year A 2017.htm', N'./HTML_Files/Main Pages/Main Ordinary Season Year A 2017.htm', N'Main Pages')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (27, N'ApostlesCreed.htm', N'./HTML_Files/Mass Prayers/ApostlesCreed.htm', N'Mass Prayers')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (28, N'TheConfiteor.htm', N'./HTML_Files/Mass Prayers/TheConfiteor.htm', N'Mass Prayers')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (29, N'Amen.htm', N'./HTML_Files/Mass Settings/Amen.htm', N'Mass Settings')
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
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (50, N'Sing_to_the_Mountains.htm', N'./HTML_Files/Sing_to_the_Mountains.htm', N'')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (51, N'SongofthebodyofChrist.htm', N'./HTML_Files/SongofthebodyofChrist.htm', N'')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (52, N'Springs of Water.htm', N'./HTML_Files/Springs of Water.htm', N'')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (53, N'100th Year Fatima.htm', N'./HTML_Files/Start and other pages/100th Year Fatima.htm', N'Start and other pages')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (54, N'Start Page 23 April 2017.htm', N'./HTML_Files/Start and other pages/Start Page 23 April 2017.htm', N'Start and other pages')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (55, N'Start Page 30th April 2017.htm', N'./HTML_Files/Start and other pages/Start Page 30th April 2017.htm', N'Start and other pages')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (56, N'Start Page Ascension April 2017.htm', N'./HTML_Files/Start and other pages/Start Page Ascension April 2017.htm', N'Start and other pages')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (57, N'Taize laudate Domimun.htm', N'./HTML_Files/Taize laudate Domimun.htm', N'')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (58, N'Take and Eat.htm', N'./HTML_Files/Take and Eat.htm', N'')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (59, N'Take the word of God with you.htm', N'./HTML_Files/Take the word of God with you.htm', N'')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (60, N'Ubi caritas est vera.htm', N'./HTML_Files/Ubi caritas est vera.htm', N'')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (61, N'Unless a Grain of Wheat.htm', N'./HTML_Files/Unless a Grain of Wheat.htm', N'')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (62, N'We Praise you O God 2013.htm', N'./HTML_Files/We Praise you O God 2013.htm', N'')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (63, N'We Praise You O God.htm', N'./HTML_Files/We Praise You O God.htm', N'')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (64, N'We remember.htm', N'./HTML_Files/We remember.htm', N'')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (65, N'We Walk by Faith.htm', N'./HTML_Files/We Walk by Faith.htm', N'')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (66, N'Where Two Three are Gathered.htm', N'./HTML_Files/Where Two Three are Gathered.htm', N'')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (67, N'Without  Seeing  You Easter Version.htm', N'./HTML_Files/Without  Seeing  You Easter Version.htm', N'')
INSERT [dbo].[Song] ([id], [song_name], [path], [tags]) VALUES (68, N'Announcements', N'./HTML_Files/Start and other pages/Announcements.htm', N'Start and other pages')
SET IDENTITY_INSERT [dbo].[Song] OFF
SET IDENTITY_INSERT [dbo].[Template] ON 

INSERT [dbo].[Template] ([id], [name]) VALUES (1, N'Aug 20')
SET IDENTITY_INSERT [dbo].[Template] OFF
SET IDENTITY_INSERT [dbo].[TemplateDetail] ON 

INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index]) VALUES (1, 1, 68, 0)
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index]) VALUES (2, 1, 12, 1)
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index]) VALUES (3, 1, 30, 2)
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index]) VALUES (4, 1, 46, 3)
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index]) VALUES (5, 1, 32, 4)
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index]) VALUES (6, 1, 27, 5)
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index]) VALUES (7, 1, 62, 6)
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index]) VALUES (8, 1, 33, 7)
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index]) VALUES (9, 1, 36, 8)
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index]) VALUES (10, 1, 29, 9)
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index]) VALUES (11, 1, 35, 10)
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index]) VALUES (12, 1, 64, 11)
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index]) VALUES (13, 1, 24, 12)
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index]) VALUES (14, 1, 2, 13)
INSERT [dbo].[TemplateDetail] ([id], [template_id], [song_id], [order_index]) VALUES (15, 1, 5, 14)
SET IDENTITY_INSERT [dbo].[TemplateDetail] OFF
USE [master]
GO
ALTER DATABASE [SongChooser] SET  READ_WRITE 
GO
