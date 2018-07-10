import sys
import fileinput
import re
import subprocess
import shlex

Config_file = '../../conf/spark-env.sh'


Edit_RAM = sys.argv[1]                                                                           # input your RAM Label
Edit_CORE = sys.argv[2]                                                                         # input your Core Label
print("Core running | xxc: " + str(Edit_CORE) + " fff: " + str(Edit_RAM))


def change():
    edit_ram_text = str(Edit_RAM)
    edit_core_text = str(Edit_CORE)
    ram_pattern = 'SPARK_WORKER_MEMORY=\dg'                                              # patter for regular expression
    core_pattern = 'export SPARK_WORKER_CORES=\\"\d'  # patter for regular expression

    for i, line in enumerate(fileinput.input(Config_file, inplace=1)):
        temp_res_ram = re.search(ram_pattern, line)
        temp_res_core = re.search(core_pattern, line)
        if temp_res_ram:
            sys.stdout.write(line.replace(line[:-1],
                                          'SPARK_WORKER_MEMORY=' + edit_ram_text + 'g'))  # replace old ram and write
        elif temp_res_core:
            sys.stdout.write(
                line.replace(line[:-2], 'export SPARK_WORKER_CORES=\"' + edit_core_text))  # replace old core and write
        else:
            sys.stdout.write(line)





def start_elanim():
    master_ip = "spark://"+sys.argv[3]
    subprocess.call(shlex.split('sudo ../../sbin/start-slave.sh '+master_ip))


if (str(Edit_RAM) and str(Edit_CORE) and str(sys.argv[3])) != "":
    change()
    start_elanim()




