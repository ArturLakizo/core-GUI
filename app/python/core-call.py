import sys
import fileinput
import re
import subprocess
import shlex

Config_file = './conf/spark-env.sh'


Edit_RAM = sys.argv[0]                                                                           # input your RAM Label
Edit_CORE = sys.argv[1]                                                                         # input your Core Label


def change_ram():                                                                            # calling from button2
    edit_ram_text = str(Edit_RAM)
    ram_pattern = 'SPARK_WORKER_MEMORY=\dg'                                              # patter for regular expression

    for i, line in enumerate(fileinput.input(Config_file, inplace=1)):
        temp_res = re.search(ram_pattern, line)
        if temp_res:
            sys.stdout.write(line.replace(line[:-1],
                                          'SPARK_WORKER_MEMORY=' + edit_ram_text + 'g'))  # replace old ram and write
        else:
            sys.stdout.write(line)


def change_core():                                                                            # calling from button2
    edit_core_text = str(Edit_CORE)
    core_pattern = 'export SPARK_WORKER_CORES=\\"\d'                                     # patter for regular expression

    for i, line in enumerate(fileinput.input(Config_file, inplace=1)):
        temp_res = re.search(core_pattern, line)
        if temp_res:
            sys.stdout.write(
                line.replace(line[:-2], 'export SPARK_WORKER_CORES=\"' + edit_core_text))  # replace old core and write
        else:
            sys.stdout.write(line)


def start_elanim():
    master_ip = "spark://"+sys.argv[2]                     # Master IP
    subprocess.call(shlex.split('sudo ./sbin/start-slave.sh '+master_ip))








