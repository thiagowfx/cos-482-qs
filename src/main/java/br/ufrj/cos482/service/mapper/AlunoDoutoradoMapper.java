package br.ufrj.cos482.service.mapper;

import br.ufrj.cos482.domain.*;
import br.ufrj.cos482.service.dto.AlunoDoutoradoDTO;

import org.mapstruct.*;
import java.util.List;

/**
 * Mapper for the entity AlunoDoutorado and its DTO AlunoDoutoradoDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface AlunoDoutoradoMapper {

    @Mapping(source = "ataDissertacao.id", target = "ataDissertacaoId")
    @Mapping(source = "certidaoConclusao.id", target = "certidaoConclusaoId")
    @Mapping(source = "diplomaMestrado.id", target = "diplomaMestradoId")
    @Mapping(source = "aluno.id", target = "alunoId")
    AlunoDoutoradoDTO alunoDoutoradoToAlunoDoutoradoDTO(AlunoDoutorado alunoDoutorado);

    List<AlunoDoutoradoDTO> alunoDoutoradosToAlunoDoutoradoDTOs(List<AlunoDoutorado> alunoDoutorados);

    @Mapping(source = "ataDissertacaoId", target = "ataDissertacao")
    @Mapping(source = "certidaoConclusaoId", target = "certidaoConclusao")
    @Mapping(source = "diplomaMestradoId", target = "diplomaMestrado")
    @Mapping(source = "alunoId", target = "aluno")
    AlunoDoutorado alunoDoutoradoDTOToAlunoDoutorado(AlunoDoutoradoDTO alunoDoutoradoDTO);

    List<AlunoDoutorado> alunoDoutoradoDTOsToAlunoDoutorados(List<AlunoDoutoradoDTO> alunoDoutoradoDTOs);

    default DocumentoSistema documentoSistemaFromId(Long id) {
        if (id == null) {
            return null;
        }
        DocumentoSistema documentoSistema = new DocumentoSistema();
        documentoSistema.setId(id);
        return documentoSistema;
    }

    default Aluno alunoFromId(Long id) {
        if (id == null) {
            return null;
        }
        Aluno aluno = new Aluno();
        aluno.setId(id);
        return aluno;
    }
}
