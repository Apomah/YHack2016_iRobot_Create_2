from distutils.core import setup

setup (name = 'iRobot Create 2',
        packages = ['iRobotCreate2'],
        package_data={'iRobotCreate2' : ['config.json']},
        version = '0.1',
        description = 'Simple API for iRobot Create2',
        author='Matthew Po, Justin Cook, Zain Tahlilkar, Peter Peng',
        author_email='matthewbpo@gmail.com  ',
        )
