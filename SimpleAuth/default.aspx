<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>SimpleAuth</title>
    <style>
        body {
            background: radial-gradient(690px at 50% 50%, rgba(9, 156, 236, 0.87) 0%, rgba(6, 109, 165, 0.87) 100%);
            color: rgb(6, 109, 165);
            font-family: Arial, Helvetica, sans-serif;
        }

        .main {
            box-shadow: rgba(0, 0, 0, 0.25) 0px 0px 4px;
            width: 400px;
            height: 200px;
            text-align: center;
            background: rgb(255, 255, 255);
            border-radius: 4px;
            margin: 25px auto 0px;
            padding: 50px 45px 72px;
        }

        .main h1,
        .main h2 {
            font-weight: normal;
        }
        
        .main span {
            font-weight: bold;
            clear: both;
            font-size: 35px;
            word-wrap:break-word;
        }
    </style>
</head>

<body>

    <div class="main">

        <div class="logo">
                <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" class="" viewBox="0 0 62 44" style="width: 62px; height: 44px;"><path fill-rule="evenodd" clip-rule="evenodd" d="M35.0668 20.2162H41.4685V14.2703H35.0668V20.2162ZM27.5012 20.2162H33.9029V14.2703H27.5012V20.2162ZM19.9355 20.2162H26.3372V14.2703H19.9355V20.2162ZM12.3699 20.2162H18.7716V14.2703H12.3699V20.2162ZM4.80419 20.2162H11.2059V14.2703H4.80419V20.2162ZM12.3699 13.0811H18.7716V7.13514H12.3699V13.0811ZM19.9355 13.0811H26.3372V7.13514H19.9355V13.0811ZM27.5012 13.0811H33.9029V7.13514H27.5012V13.0811ZM27.5012 5.94595H33.9029V0H27.5012V5.94595ZM53.6242 15.9203C53.3065 13.5413 52.0081 11.4781 49.6482 9.61341L48.291 8.68881L47.3855 10.0766C46.2262 11.8628 45.6465 14.3375 45.8363 16.7105C45.9218 17.5453 46.1907 19.0389 47.0316 20.3512C46.1907 20.8132 44.5385 21.45 42.3415 21.4054H0.238607L0.156548 21.9007C-0.239194 24.2856 -0.230464 31.7282 4.49866 37.4482C8.09351 41.7958 13.4832 44 20.5175 44C35.7669 44 47.0485 36.8286 52.3322 23.7915C54.407 23.8343 58.8829 23.8034 61.1812 19.3184C61.2405 19.2161 61.3784 18.9462 61.7794 18.0965L62 17.6309L60.7074 16.7491C59.3084 15.7936 56.0976 15.4434 53.6242 15.9203Z" fill="#099CEC"></path></svg>
        </div>

        <h1>Authenticated as <span><%=User.Identity.Name%></span></h1>
        <h2>Type of Authentication: <span><%=User.Identity.AuthenticationType%></span></h2>
    </div>

</body>

</html>