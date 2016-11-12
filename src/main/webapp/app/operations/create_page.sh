#!/usr/bin

new_folder=$1;

n1="";
n2="";

for var in ${@:2};
do
    n1="$n1 $var";
    n2="$n2$var";
done

cp -r cadastrar-aluno $new_folder
cd $new_folder

find . -type f -exec sed -i -e "s/cadastrar-aluno/$new_folder/g" {} \;
find . -type f -exec sed -i -e "s/Cadastrar Aluno/$n1/g" {} \;
find . -type f -exec sed -i -e "s/CadastrarAluno/$n2/g" {} \;

rm *-e*
