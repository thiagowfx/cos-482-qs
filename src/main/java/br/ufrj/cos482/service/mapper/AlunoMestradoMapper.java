package br.ufrj.cos482.service.mapper;

import br.ufrj.cos482.domain.*;
import br.ufrj.cos482.service.dto.AlunoMestradoDTO;

import org.mapstruct.*;
import java.util.List;

/**
 * Mapper for the entity AlunoMestrado and its DTO AlunoMestradoDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface AlunoMestradoMapper {

    @Mapping(source = "diplomaGraduacao.id", target = "diplomaGraduacaoId")
    @Mapping(source = "certidaoConclusao.id", target = "certidaoConclusaoId")
    @Mapping(source = "certidaoColacao.id", target = "certidaoColacaoId")
    @Mapping(source = "aluno.id", target = "alunoId")
    AlunoMestradoDTO alunoMestradoToAlunoMestradoDTO(AlunoMestrado alunoMestrado);

    List<AlunoMestradoDTO> alunoMestradosToAlunoMestradoDTOs(List<AlunoMestrado> alunoMestrados);

    @Mapping(source = "diplomaGraduacaoId", target = "diplomaGraduacao")
    @Mapping(source = "certidaoConclusaoId", target = "certidaoConclusao")
    @Mapping(source = "certidaoColacaoId", target = "certidaoColacao")
    @Mapping(source = "alunoId", target = "aluno")
    AlunoMestrado alunoMestradoDTOToAlunoMestrado(AlunoMestradoDTO alunoMestradoDTO);

    List<AlunoMestrado> alunoMestradoDTOsToAlunoMestrados(List<AlunoMestradoDTO> alunoMestradoDTOs);

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
