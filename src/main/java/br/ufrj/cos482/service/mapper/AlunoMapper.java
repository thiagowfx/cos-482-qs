package br.ufrj.cos482.service.mapper;

import br.ufrj.cos482.domain.*;
import br.ufrj.cos482.service.dto.AlunoDTO;

import org.mapstruct.*;
import java.util.List;

/**
 * Mapper for the entity Aluno and its DTO AlunoDTO.
 */
@Mapper(componentModel = "spring", uses = {ProfessorMapper.class, })
public interface AlunoMapper {

    @Mapping(source = "declaracaoConclusao.id", target = "declaracaoConclusaoId")
    @Mapping(source = "historicoGraduacao.id", target = "historicoGraduacaoId")
    @Mapping(source = "usuario.id", target = "usuarioId")
    AlunoDTO alunoToAlunoDTO(Aluno aluno);

    List<AlunoDTO> alunosToAlunoDTOs(List<Aluno> alunos);

    @Mapping(source = "declaracaoConclusaoId", target = "declaracaoConclusao")
    @Mapping(source = "historicoGraduacaoId", target = "historicoGraduacao")
    @Mapping(source = "usuarioId", target = "usuario")
    Aluno alunoDTOToAluno(AlunoDTO alunoDTO);

    List<Aluno> alunoDTOsToAlunos(List<AlunoDTO> alunoDTOs);

    default DocumentoSistema documentoSistemaFromId(Long id) {
        if (id == null) {
            return null;
        }
        DocumentoSistema documentoSistema = new DocumentoSistema();
        documentoSistema.setId(id);
        return documentoSistema;
    }

    default Usuario usuarioFromId(Long id) {
        if (id == null) {
            return null;
        }
        Usuario usuario = new Usuario();
        usuario.setId(id);
        return usuario;
    }

    default Professor professorFromId(Long id) {
        if (id == null) {
            return null;
        }
        Professor professor = new Professor();
        professor.setId(id);
        return professor;
    }
}
